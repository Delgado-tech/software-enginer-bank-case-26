import chalk from "chalk";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";

export const getMainMenu: GetMenuFn<MenuNameId> = (appInstance) => {
	return {
		id: "main",
		menu: {
			header: "Menu Principal",
			options: [
				{
					name: "Conta",
					onSelect: () => appInstance.render("account"),
				},
				{ name: "Extrato", onSelect() {} },
				{ name: "Transação", onSelect() {} },
				{
					name: chalk.gray("Sair"),
					onSelect() {
						process.exit();
					},
				},
			],
		},
	};
};
