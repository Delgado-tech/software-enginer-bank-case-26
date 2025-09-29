import type { MenuCollectionController } from "../controllers/menu-collection.controller.ts";

export interface App {
	sessionAccountId: number;
	menu: MenuCollectionController<T>;
	onExit: () => void;
}
