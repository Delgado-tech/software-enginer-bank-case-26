import type { MenuView } from "../views/menu.view.ts";
import type { App } from "./App.js";
import type { MenuNameId } from "./MenuList.js";

export type ConfirmFormProps = { appInstance: App<MenuNameId>; view: MenuView };
