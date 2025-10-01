import chalk from "chalk";
import { AccountsController } from "../../controllers/accounts.controller.js";
import { OperationModel } from "../../models/operation.model.js";
import { OperationType } from "../../types/OperationType.js";
import type { GetSubMenu } from "../../types/SubMenu.js";
import { AccountView } from "../../views/account.view.js";
import { SubMenuModel } from "../../models/submenu.model.js";
import { form } from "../forms/form.js";
import type { Form } from "../../types/Form.js";
import { TaxModel } from "../../models/tax.model.js";
import { TED_TAX } from "../../constants.js";
import { BankStatementsController } from "../../controllers/bankStatements.controller.js";

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
		getConfirmBeforeText(formResult) {
			if (!formResult) return;
			const amount = Number(formResult.amount);
			const tax = new TaxModel().getTaxPercent(amount, amount + TED_TAX);

			let taxColor: string;

			if (tax >= 100) {
				taxColor = "#FF0000"; // vermelho
			} else if (tax >= 50) {
				taxColor = "#F18D0A"; // laranja escuro
			} else if (tax >= 15) {
				taxColor = "#F1CF0A"; // amarelo
			} else if (tax >= 3) {
				taxColor = "#FFFFFF"; // branco
			} else {
				taxColor = "#00FF00"; // verde (default)
			}

			console.log(
				chalk.gray(
					`\n\nPara transações TED é cobrado uma taxa de ${chalk.white(accountView.formatBalance(TED_TAX))}`,
					`\nIsso representa ${chalk.hex(taxColor)(tax.toFixed(2) + "%")} do valor de ${chalk.white(accountView.formatBalance(amount))}`,
				),
			);
		},
	});

	if (formResult) {
		const amount = Number(formResult.amount) + TED_TAX;

		const sucess = AccountsController.Instance.transact({
			id: appInstance.sessionAccountId,
			amount: amount,
			operation: OperationType.remove,
		});

		const msg = sucess
			? "TED realizado com sucesso!"
			: "Ocorreu um erro ao realizar a operação, tente novamente mais tarde";

		if (sucess) {
			BankStatementsController.Instance.add([
				{
					accountId: appInstance.sessionAccountId,
					amount,
					date: new Date(),
					institution: `Banco (${formResult.bank})`,
					payeeName: formResult.accountHolder,
					type: "out",
					description: "Transação TED",
				},
			]);
		}

		await view.message(msg);
	}

	appInstance.menu.render("transfer", appInstance);
};
