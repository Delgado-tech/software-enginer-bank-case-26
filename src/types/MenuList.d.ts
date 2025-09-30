import { MenuModelProps } from "./MenuModel.d.ts";

export type MenuNameId = "main" | "account" | "transaction" | "transfer";

export interface MenuItem<T> {
	id: T;
	menu: MenuModelProps;
}

export type GetMenuFn<T = any> = (appInstance: App<T>) => MenuItem<T>;
