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
type FormKeys =
	| "accountHolder"
	| "cpf_cpnj"
	| "branch"
	| "accountNumber"
	| "bank"
	| "accountType"
	| "amount";

export const getTransferTedSubMenu: GetSubMenu = async ({
	model,
	view,
	appInstance,
}) => {
	const account = AccountsController.Instance.get(appInstance.sessionAccountId);
	const balance = accountView.formatBalance(account?.balance ?? 0);

	const subMenu = new SubMenuModel({
		subMenuName: "TED",
		model,
		view,
		appInstance,
	});

	const initialForm: Form<FormKeys> = {
		accountHolder: {
			label: "Titular",
			value: undefined,
			validation: {
				notEmpty: true,
				minLen: 8,
			},
		},
		cpf_cpnj: {
			label: "CPF/CNPJ",
			value: undefined,
			validation: {
				notEmpty: true,
				number: true,
				minLen: 11,
				maxLen: 13,
			},
		},
		branch: {
			label: "Agência",
			value: undefined,
			validation: {
				notEmpty: true,
				number: true,
				minLen: 4,
				maxLen: 5,
			},
		},
		bank: {
			label: "Banco",
			value: undefined,
			validation: { notEmpty: true, number: true, minLen: 3 },
		},
		accountType: {
			label: "Tipo de Conta (0 - Corrente / 1 - Poupança)",
			value: undefined,
			validation: {
				notEmpty: true,
				number: true,
				min: 0,
				max: 1,
			},
		},
		accountNumber: {
			label: "Conta",
			value: undefined,
			validation: {
				notEmpty: true,
				number: true,
				minLen: 8,
				maxLen: 11,
			},
		},
		amount: {
			label: "Valor (R$)",
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

		await view.message("TED realizado com sucesso!");
	}

	appInstance.menu.render("transaction", appInstance);
};
