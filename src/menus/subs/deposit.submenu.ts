import chalk from "chalk";
import { AccountsController } from "../../controllers/accounts.controller.js";
import { OperationModel } from "../../models/operation.model.js";
import { OperationType } from "../../types/OperationType.js";
import type { GetSubMenu } from "../../types/SubMenu.js";
import { AccountView } from "../../views/account.view.js";
import { SubMenuModel } from "../../models/submenu.model.js";
import { confirmForm } from "../forms/confirm.form.js";
import { inputForm } from "../forms/input.form.js";

const accountView = new AccountView();

export const getDepositSubMenu: GetSubMenu = async ({
	model,
	view,
	appInstance,
}) => {
	const balance = accountView.formatBalance(
		AccountsController.Instance.get(appInstance.sessionAccountId)?.balance ?? 0,
	);

	const subMenu = new SubMenuModel({
		subMenuName: "Depositar",
		model,
		view,
		appInstance,
	});

	const getSubMenu = async () => {
		console.clear();
		view.renderMenuAndReturn({
			header: subMenu.header,
			headerColor: subMenu.headerColor,
			content: chalk.green(`Saldo: ${balance}`),
			endContent: chalk.gray("\n(envie [X] para cancelar)"),
		});

		const amount = await inputForm({
			label: "Depositar (R$)",
			appInstance,
			validation: {
				notEmpty: true,
				min: 1,
			},
		});

		if (!amount.isValid) {
			if (amount.value === undefined) return;

			await view.message(amount.reason);
			return getSubMenu();
		}

		const confirmed = await confirmForm(appInstance);
		if (!confirmed) return;

		const account = AccountsController.Instance.get(appInstance.sessionAccountId);

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
	};

	await getSubMenu();

	appInstance.menu.render("transaction", appInstance);
};
