import chalk from "chalk";
import { AccountsController } from "./controllers/accounts.controller.js";
import { MenuCollectionController } from "./controllers/menu-collection.controller.js";
import { getAccountMenu } from "./menus/account.menu.js";
import { getMainMenu } from "./menus/main.menu.js";
import { getTransactionMenu } from "./menus/transaction.menu.js";
import { accountsMock } from "./mocks/accounts.mock.js";
import type { App } from "./types/App.js";
import type { MenuNameId } from "./types/MenuList.js";
import { getTransferMenu } from "./menus/transfer.menu.js";
import { select } from "@inquirer/prompts";
import { BankStatementsController } from "./controllers/bankStatements.controller.js";
import { bankStatementMock } from "./mocks/bank-statement.mock.js";
import { BankStatementView } from "./views/bank-statement.view.js";
import { BankStatementModel } from "./models/bank-statement.model.js";

// inicializa as contas de usuário
AccountsController.Instance.add(accountsMock);
BankStatementsController.Instance.add(bankStatementMock);

const app: App<MenuNameId> = {
	sessionAccountId: 0,
	menu: new MenuCollectionController(),
	onExit() {
		const msg = chalk.green(
			"Obrigado por usar nossos serviços,\nNos vemos em breve!\n",
		);

		console.clear();
		console.log(msg);

		process.exit();
	},
};

app.menu.register(() => getMainMenu(app));
app.menu.register(() => getAccountMenu(app));
app.menu.register(() => getTransactionMenu(app));
app.menu.register(() => getTransferMenu(app));

app.menu.render("main", app);
