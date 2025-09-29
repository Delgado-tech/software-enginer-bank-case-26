import chalk from "chalk";
import type { App } from "../types/App.js";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";

export const getMainMenu: GetMenuFn<MenuNameId> = (
	appInstance: App<MenuNameId>,
) => {
	return {
		id: "main",
		menu: {
			header: "Menu Principal",
			options: [
				{
					name: "Conta",
					onSelect: () => appInstance.menu.render("account"),
				},
				{ name: "Extrato", onSelect() {} },
				{
					name: "Transação",
					onSelect: () => appInstance.menu.render("transaction"),
				},
				{
					name: chalk.gray("Sair"),
					onSelect() {
						appInstance.onExit?.();
					},
				},
			],
		},
	};
};
