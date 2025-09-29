import chalk from "chalk";
import type { App } from "../types/App.js";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";
import enq from "enquirer";
import type { MenuView } from "../views/menu.view.js";
import { Validate } from "../utils/validate.js";
import type { PromptReturn } from "../types/PromptReturn.js";
import { MenuModel } from "../models/menu.model.js";
import { AccountView } from "../views/account.view.js";
import { AccountsController } from "../controllers/accounts.controller.js";

const { prompt } = enq;

const accountView = new AccountView();

export const getTransactionMenu: GetMenuFn<MenuNameId> = (
	appInstance: App<MenuNameId>,
) => {
	const balance = accountView.formatBalance(
		AccountsController.Instance.get(appInstance.sessionAccountId)?.balance ?? 0,
	);

	return {
		id: "transaction",
		menu: {
			header: "Operações de Transação",
			headerColor: "#FFA500",
			options: [
				{
					name: "Depositar",
					onSelect: async (model: MenuModel, view: MenuView) => {
						const depositSub = async () => {
							console.clear();
							view.renderMenuAndReturn({
								header: `${model.header}\n::Depositar`,
								headerColor: model.headerColor,
								content: chalk.green(`Saldo: ${balance}`),
								endContent: chalk.gray("\n(envie [X] para cancelar)"),
							});

							const amount: PromptReturn = await prompt({
								type: "input",
								name: "value",
								message: "Depositar (R$):",
								prefix: ">>",
							});

							if (amount.value.toLowerCase() === "x") return;

							const validate = new Validate(amount.value).test({
								notEmpty: true,
								min: 1,
							});

							if (!validate.isValid) {
								await view.message(validate.reason);
								return depositSub();
							}

							const confirm: PromptReturn = await prompt({
								type: "select",
								name: "value",
								message: "\nConfirmar operação",
								choices: ["Confirmar", chalk.gray("Cancelar")],
								prefix: "::",
							});

							if (confirm.value === "Confirmar") {
								const account = AccountsController.Instance.get(
									appInstance.sessionAccountId,
								);

								AccountsController.Instance.update({
									id: appInstance.sessionAccountId,
									account: { balance: (account?.balance ?? 0) + Number(amount.value) },
								});

								await view.message("Deposito realizado com sucesso!");
							}
						};

						await depositSub();

						appInstance.menu.render("transaction");
					},
				},
				{ name: "Sacar", onSelect() {} },
				{ name: "Transferir", onSelect() {} },
				{
					name: chalk.gray("Voltar"),
					onSelect: () => appInstance.menu.render("main"),
				},
			],
		},
	};
};
