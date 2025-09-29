import chalk from "chalk";
import { AccountsController } from "../controllers/accounts.controller.js";
import type { App } from "../types/App.js";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";
import { AccountView } from "../views/account.view.js";

const accountView = new AccountView();

export const getAccountMenu: GetMenuFn<MenuNameId> = (
	appInstance: App<MenuNameId>,
) => {
	const accountInfo = accountView.renderAccountInfo(
		AccountsController.Instance.get(appInstance.sessionAccountId),
	);

	return {
		id: "account",
		menu: {
			header: "Dados da Conta",
			content: accountInfo,
			options: [
				{
					name: chalk.gray("Voltar"),
					onSelect: async () => {
						await appInstance.menu.render("main");
					},
				},
			],
		},
	};
};
