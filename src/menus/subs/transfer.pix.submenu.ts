import chalk from "chalk";
import { AccountsController } from "../../controllers/accounts.controller.js";
import { OperationModel } from "../../models/operation.model.js";
import { OperationType } from "../../types/OperationType.js";
import type { GetSubMenu } from "../../types/SubMenu.js";
import { AccountView } from "../../views/account.view.js";
import { SubMenuModel } from "../../models/submenu.model.js";
import { form } from "../forms/form.js";
import type { Form } from "../../types/Form.js";
import { BankStatementsController } from "../../controllers/bankStatements.controller.js";

const accountView = new AccountView();
type FormKeys = "pix" | "amount";

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
		getConfirmBeforeText() {},
	});

	if (formResult) {
		const amount = Number(formResult.amount);

		// realiza transação de remoção de valor da conta
		const sucess = AccountsController.Instance.transact({
			id: appInstance.sessionAccountId,
			operation: OperationType.remove,
			amount,
		});

		const msg = sucess
			? "PIX realizado com sucesso!"
			: "Ocorreu um erro ao realizar a operação, tente novamente mais tarde";

		if (sucess) {
			// registra no extrato a operação realizada
			BankStatementsController.Instance.add([
				{
					accountId: appInstance.sessionAccountId,
					amount,
					date: new Date(),
					institution: `Nubank`,
					payeeName: `Chave: ${formResult.pix}`,
					type: "out",
					description: "Transação PIX",
				},
			]);
		}

		await view.message(msg);
	}

	appInstance.menu.render("transfer", appInstance);
};
