import chalk from "chalk";
import enq from "enquirer";
import { AccountsController } from "../../controllers/accounts.controller.js";
import { OperationModel } from "../../models/operation.model.js";
import { OperationType } from "../../types/OperationType.js";
import type { PromptReturn } from "../../types/PromptReturn.js";
import type { GetSubMenu, SubMenuProps } from "../../types/SubMenu.js";
import { Validate } from "../../utils/validate.js";
import { AccountView } from "../../views/account.view.js";

const { prompt } = enq;

const accountView = new AccountView();

export const depositSubMenu: GetSubMenu = async ({
	model,
	view,
	appInstance,
}: SubMenuProps) => {
	const balance = accountView.formatBalance(
		AccountsController.Instance.get(appInstance.sessionAccountId)?.balance ?? 0,
	);

	const getSubMenu = async () => {
		console.clear();
		view.renderMenuAndReturn({
			header: `${model.header}\n::Depositar`,
			headerColor: model.headerColor,
			content: chalk.green(`Saldo: ${balance}`),
			endContent: chalk.gray("\n(envie [X] para cancelar)"),
		});

		const amount = (await prompt({
			type: "input",
			name: "value",
			message: "Depositar (R$):",
			prefix: ">>",
		}).catch(() => appInstance.onExit())) as void | PromptReturn;

		if (!amount || amount.value.toLowerCase() === "x") return;

		const validate = new Validate(amount.value).test({
			notEmpty: true,
			min: 1,
		});

		if (!validate.isValid) {
			await view.message(validate.reason);
			return getSubMenu();
		}

		const confirm = (await prompt({
			type: "select",
			name: "value",
			message: "\nConfirmar operação",
			choices: ["Confirmar", chalk.gray("Cancelar")],
			prefix: "::",
		}).catch(() => appInstance.onExit())) as void | PromptReturn;

		if (confirm?.value === "Confirmar") {
			const account = AccountsController.Instance.get(
				appInstance.sessionAccountId,
			);

			const newBalance = new OperationModel({
				operation: OperationType.sell,
				quantity: 1,
				unitCost: Number(amount.value),
			}).run(account?.balance ?? 0);

			AccountsController.Instance.update({
				id: appInstance.sessionAccountId,
				account: { balance: newBalance },
			});

			await view.message("Deposito realizado com sucesso!");
		}
	};

	await getSubMenu();

	appInstance.menu.render("transaction", appInstance);
};
