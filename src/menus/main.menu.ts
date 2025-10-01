import chalk from "chalk";
import type { App } from "../types/App.js";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";
import inquirer from "inquirer";
import { getBankStatementSubMenu } from "./subs/bank-statement.menu.js";
import { MenuModel } from "../models/menu.model.js";
import { MenuView } from "../views/menu.view.js";

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
					onSelect: () => appInstance.menu.render("account", appInstance),
				},
				{
					name: "Extrato",
					onSelect: async () => {
						await getBankStatementSubMenu({
							model: new MenuModel({ header: "Extrato" }),
							view: new MenuView(),
							appInstance,
						});

						appInstance.menu.render("main", appInstance);
					},
				},
				{
					name: "Transação",
					onSelect: () => appInstance.menu.render("transaction", appInstance),
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
