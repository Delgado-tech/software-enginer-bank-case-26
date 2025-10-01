import chalk from "chalk";
import { AccountsController } from "../controllers/accounts.controller.js";
import type { App } from "../types/App.js";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";
import { AccountView } from "../views/account.view.js";

export const getAccountMenu: GetMenuFn<MenuNameId> = (
	appInstance: App<MenuNameId>,
) => {
	const getAccountInfo = () => {
		const accountView = new AccountView();

		return accountView.getAccountInfo(
			AccountsController.Instance.get(appInstance.sessionAccountId),
		);
	};

	return {
		id: "account",
		menu: {
			header: "Dados da Conta",
			content: getAccountInfo(),
			options: [
				{
					name: chalk.gray("Voltar"),
					onSelect: async () => {
						await appInstance.menu.render("main", appInstance);
					},
				},
			],
		},
	};
};
