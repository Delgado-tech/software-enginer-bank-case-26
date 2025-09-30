import chalk from "chalk";
import { AccountsController } from "../../controllers/accounts.controller.js";
import { OperationModel } from "../../models/operation.model.js";
import { OperationType } from "../../types/OperationType.js";
import type { GetSubMenu } from "../../types/SubMenu.js";
import { AccountView } from "../../views/account.view.js";
import { SubMenuModel } from "../../models/submenu.model.js";
import { confirmForm } from "../forms/confirm.form.js";
import { inputForm } from "../forms/input.form.js";
import enq from "enquirer";
import type { ValidationType } from "../../types/Validate.js";
import { form } from "../forms/form.js";
import type { Form } from "../../types/Form.js";
const { prompt } = enq;
const accountView = new AccountView();

export const getTransferPixSubMenu: GetSubMenu = async ({
	model,
	view,
	appInstance,
}) => {
	const account = AccountsController.Instance.get(appInstance.sessionAccountId);
	const balance = accountView.formatBalance(account?.balance ?? 0);

	const subMenu = new SubMenuModel({
		subMenuName: "PIX",
		model,
		view,
		appInstance,
	});

	type FormKeys = "pix" | "amount";

	const initialForm: Form<FormKeys> = {
		pix: {
			label: "Chave PIX",
			value: undefined,
			validation: { notEmpty: true, minLen: 3 },
		},
		amount: {
			label: "Valor (R$)",
			value: undefined,
			validation: { notEmpty: true, min: 1, max: account?.balance },
		},
	};

	const formResult = await form<FormKeys>({
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
		// PIX CONFIRMADO
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

		await view.message("PIX realizado com sucesso!");
	}

	appInstance.menu.render("transaction", appInstance);
};
