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
import { BankStatementsController } from "./controllers/bankStatements.controller.js";
import { bankStatementMock } from "./mocks/bank-statement.mock.js";

// inicializa as contas de usuário
AccountsController.Instance.add(accountsMock);
// inicializa o histórico de transações dos usuários
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

// registra menus no aplicativo
app.menu.register(() => getMainMenu(app));
app.menu.register(() => getAccountMenu(app));
app.menu.register(() => getTransactionMenu(app));
app.menu.register(() => getTransferMenu(app));

// inicializa o app renderizando o menu main
app.menu.render("main", app);
