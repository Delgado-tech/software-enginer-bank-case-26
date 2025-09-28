import chalk from "chalk";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";

export const getAccountMenu: GetMenuFn<MenuNameId> = (appInstance) => {
	return {
		id: "account",
		menu: {
			header: "Dados da Conta",
			options: [
				{
					name: chalk.gray("Voltar"),
					onSelect: async () => {
						await appInstance.render("main");
					},
				},
			],
		},
	};
};
