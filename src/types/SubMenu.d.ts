import type { MenuModel } from "../models/menu.model.ts";
import type { MenuView } from "../views/menu.view.ts";
import type { App } from "./App.js";
import type { MenuNameId } from "./MenuList.js";

export type SubMenuProps = {
	model: MenuModel;
	view: MenuView;
	subMenuName?: string;
	appInstance: App<MenuNameId>;
};

export type GetSubMenu = ({
	model,
	view,
	appInstance,
}: SubMenuProps) => Promise<void>;
