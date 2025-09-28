import { MenuCollectionController } from "./controllers/menu-collection.controller.js";
import type { MenuNameId } from "./types/MenuList.js";
import { getMainMenu } from "./menus/main.menu.js";
import { getAccountMenu } from "./menus/account.menu.js";

const app = new MenuCollectionController<MenuNameId>();

app.register(getMainMenu(app));
app.register(getAccountMenu(app));

app.render("main");
