import { Account } from "../models/account.model.js";

export const accountMock = new Account({
	accountHolder: "Leonardo Delgado",
	accountType: "savings",
	branch: "0001",
	balance: 1000,
	accountNumber: "9252044736",
	bank: "260 (Nubank)",
	cpf: "11727602099",
});
