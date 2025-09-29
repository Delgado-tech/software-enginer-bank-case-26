import { MenuModelProps } from "./MenuModel.d.ts";

export type MenuNameId = "main" | "account";

export interface MenuItem<T> {
	id: T;
	menu: MenuModelProps;
}

export type GetMenuFn<T = any> = (appInstance: App) => MenuItem<T>;
