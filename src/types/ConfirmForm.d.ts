import type { MenuView } from "../views/menu.view.ts";
import type { App } from "./App.js";
import type { FormResult } from "./Form.js";
import type { MenuNameId } from "./MenuList.js";

export type ConfirmFormProps<T> = {
	appInstance: App<MenuNameId>;
	view: MenuView;
	getBeforeText: (formResult?: FormResult<T>) => void;
};
