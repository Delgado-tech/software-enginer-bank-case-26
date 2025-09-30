import chalk from "chalk";
import { MenuModel } from "../models/menu.model.js";
import type { App } from "../types/App.js";
import type { GetMenuFn, MenuNameId } from "../types/MenuList.js";
import type { MenuView } from "../views/menu.view.js";
import { getWithdrawSubMenu } from "./subs/withdraw.submenu.js";
import { getDepositSubMenu } from "./subs/deposit.submenu.js";
import { getTransferPixSubMenu } from "./subs/transfer.pix.submenu.js";

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
					name: "TED",
					onSelect() {
						appInstance.menu.render("transaction", appInstance);
					},
				},
				{
					name: "PIX",
					onSelect: (model: MenuModel, view: MenuView) =>
						getTransferPixSubMenu({ model, view, appInstance }),
				},
				{
					name: chalk.gray("Voltar"),
					onSelect: () => appInstance.menu.render("transaction", appInstance),
				},
			],
		},
	};
};
