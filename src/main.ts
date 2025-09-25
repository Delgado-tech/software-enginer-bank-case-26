import enq from "enquirer";
import { Account } from "./model/account.model.js";

const { prompt } = enq;

async function mainMenu() {
	const choice: any = await prompt({
		name: "titular",
		message: "Nome do Titular:",
		type: "input",
		prefix: "::",
	});

	const account = new Account(choice.titular, "", "", "", "", "checking", 0);
	console.log(account.accountHolder);
}

mainMenu();
