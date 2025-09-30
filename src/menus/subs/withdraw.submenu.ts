import chalk from "chalk";
import { AccountsController } from "../../controllers/accounts.controller.js";
import { OperationModel } from "../../models/operation.model.js";
import { OperationType } from "../../types/OperationType.js";
import type { GetSubMenu } from "../../types/SubMenu.js";
import { AccountView } from "../../views/account.view.js";
import { SubMenuModel } from "../../models/submenu.model.js";
import { form } from "../forms/form.js";
import type { Form } from "../../types/Form.js";

const accountView = new AccountView();
type FormKeys = "amount";

export const getWithdrawSubMenu: GetSubMenu = async ({
	model,
	view,
	appInstance,
}) => {
	const account = AccountsController.Instance.get(appInstance.sessionAccountId);
	const balance = accountView.formatBalance(account?.balance ?? 0);

	const subMenu = new SubMenuModel({
		subMenuName: "Sacar",
		model,
		view,
		appInstance,
	});

	const initialForm: Form<FormKeys> = {
		amount: {
			label: "Sacar (R$)",
			value: undefined,
			validation: { notEmpty: true, min: 1, max: account?.balance },
		},
	};

	const formResult = await form({
		form: initialForm,
		view,
		appInstance,
		getHeader() {
			view.renderMenuAndReturn({
				header: subMenu.header,
				headerColor: subMenu.headerColor,
				content: chalk.green(`Saldo: ${balance}`),
				endContent: chalk.gray("\n(envie [X] para cancelar)"),
			});
		},
	});

	if (formResult) {
		const accountRecentInstance = AccountsController.Instance.get(
			appInstance.sessionAccountId,
		);

		const newBalance = new OperationModel({
			operation: OperationType.buy,
			quantity: 1,
			unitCost: Number(formResult.amount),
		}).run(accountRecentInstance?.balance ?? 0);

		AccountsController.Instance.update({
			id: appInstance.sessionAccountId,
			account: { balance: newBalance },
		});

		await view.message("Saque realizado com sucesso!");
	}

	appInstance.menu.render("transaction", appInstance);
};
