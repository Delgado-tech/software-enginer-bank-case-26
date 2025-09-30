import chalk from "chalk";
import enq from "enquirer";
import { MenuModel } from "../models/menu.model.js";
import type { App } from "../types/App.js";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";
import type { MenuView } from "../views/menu.view.js";
import { depositSubMenu } from "./sub/deposit.submenu.js";

const { prompt } = enq;

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
					onSelect: async (model: MenuModel, view: MenuView) =>
						depositSubMenu({ model, view, appInstance }),
				},
				{ name: "Sacar", onSelect() {} },
				{ name: "Transferir", onSelect() {} },
				{
					name: chalk.gray("Voltar"),
					onSelect: () => appInstance.menu.render("main", appInstance),
				},
			],
		},
	};
};
