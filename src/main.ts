import { AccountsController } from "./controllers/accounts.controller.js";
import { MenuCollectionController } from "./controllers/menu-collection.controller.js";
import { getAccountMenu } from "./menus/account.menu.js";
import { getMainMenu } from "./menus/main.menu.js";
import { accountsMock } from "./mocks/accounts.mock.js";
import type { App } from "./types/App.js";
import type { MenuNameId } from "./types/MenuList.js";

// inicializa as contas de usuário
AccountsController.Instance.add(accountsMock);

const app: App = {
	sessionAccountId: 0,
	menu: new MenuCollectionController<MenuNameId>(),
};

app.menu.register(getMainMenu(app));
app.menu.register(getAccountMenu(app));

app.menu.render("main");
