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

export const withdrawMenu: GetSubMenu = async ({
	model,
	view,
	appInstance,
}: SubMenuProps) => {
	const account = AccountsController.Instance.get(appInstance.sessionAccountId);
	const balance = accountView.formatBalance(account?.balance ?? 0);

	const getSubMenu = async () => {
		console.clear();
		view.renderMenuAndReturn({
			header: `${model.header}\n::Sacar`,
			headerColor: model.headerColor,
			content: chalk.green(`Saldo: ${balance}`),
			endContent: chalk.gray("\n(envie [X] para cancelar)"),
		});

		const amount = (await prompt({
			type: "input",
			name: "value",
			message: "Sacar (R$):",
			prefix: ">>",
		}).catch(() => appInstance.onExit())) as void | PromptReturn;

		if (!amount || amount.value.toLowerCase() === "x") return;

		const validate = new Validate(amount.value).test({
			notEmpty: true,
			min: 1,
			max: account?.balance,
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
				operation: OperationType.buy,
				quantity: 1,
				unitCost: Number(amount.value),
			}).run(account?.balance ?? 0);

			AccountsController.Instance.update({
				id: appInstance.sessionAccountId,
				account: { balance: newBalance },
			});

			await view.message("Saque realizado com sucesso!");
		}
	};

	await getSubMenu();

	appInstance.menu.render("transaction", appInstance);
};
