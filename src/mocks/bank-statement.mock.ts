import type { BankStatementModelProps } from "../types/BankStatementModel.js";

// dados fictícios
export const bankStatementMock: BankStatementModelProps[] = [
	{
		accountId: 0,
		type: "in",
		date: new Date(2024, 2, 10),
		payeeName: "Geraldo Gerais",
		institution: "Good Solutions",
		amount: 500,
	},
	{
		accountId: 0,
		type: "out",
		date: new Date(2025, 8, 9),
		payeeName: "Larry Low",
		institution: "Mark Market",
		amount: 300,
	},
];
