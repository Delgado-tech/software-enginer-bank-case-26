import chalk from "chalk";
import type { App } from "../types/App.js";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";

export const getTransactionMenu: GetMenuFn<MenuNameId> = (
	appInstance: App<MenuNameId>,
) => {
	return {
		id: "transaction",
		menu: {
			header: "Operações de Transação",
			headerColor: "#FFA500",
			options: [
				{
					name: "Depositar",
					onSelect() {},
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
