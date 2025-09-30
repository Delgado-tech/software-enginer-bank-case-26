import chalk from "chalk";
import { MenuModel } from "../models/menu.model.js";
import type { App } from "../types/App.js";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";
import type { MenuView } from "../views/menu.view.js";
import { getTransferPixSubMenu } from "./subs/transfer.pix.submenu.js";
import { getTransferTedSubMenu } from "./subs/transfer.ted.submenu.js";

export const getTransferMenu: GetMenuFn<MenuNameId> = (
	appInstance: App<MenuNameId>,
) => {
	return {
		id: "transfer",
		menu: {
			header: "Operações de Transação\n::Transferir",
			headerColor: "#FFA500",
			options: [
				{
					name: "PIX",
					onSelect: (model: MenuModel, view: MenuView) =>
						getTransferPixSubMenu({ model, view, appInstance }),
				},
				{
					name: "TED",
					onSelect: (model: MenuModel, view: MenuView) =>
						getTransferTedSubMenu({ model, view, appInstance }),
				},
				{
					name: chalk.gray("Voltar"),
					onSelect: () => appInstance.menu.render("transaction", appInstance),
				},
			],
		},
	};
};
