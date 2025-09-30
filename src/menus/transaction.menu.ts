import chalk from "chalk";
import { MenuModel } from "../models/menu.model.js";
import type { App } from "../types/App.js";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";
import type { MenuView } from "../views/menu.view.js";
import { getWithdrawSubMenu } from "./subs/withdraw.submenu.js";
import { getDepositSubMenu } from "./subs/deposit.submenu.js";

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
						getDepositSubMenu({ model, view, appInstance }),
				},
				{
					name: "Sacar",
					onSelect: async (model: MenuModel, view: MenuView) =>
						getWithdrawSubMenu({ model, view, appInstance }),
				},
				{ name: "Transferir", onSelect() {} },
				{
					name: chalk.gray("Voltar"),
					onSelect: () => appInstance.menu.render("main", appInstance),
				},
			],
		},
	};
};
