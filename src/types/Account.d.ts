export type AccountType = "checking" | "savings";

export interface AccountProps {
	accountHolder: string;
	branch: string;
	accountNumber: string;
	bank: string;
	cpf: string;
	accountType: AccountType;
	balance: number;
}
