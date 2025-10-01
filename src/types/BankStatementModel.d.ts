export type BankStatementModelType = "in" | "out";

export type BankStatementModelProps = {
	accountId: number;
	date: Date;
	payeeName: string;
	institution: string;
	amount: number;
	description?: string;
	type?: BankStatementModelType;
};
