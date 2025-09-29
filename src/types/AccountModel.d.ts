export type AccountType = "checking" | "savings";

export interface AccountModelProps {
	accountHolder: string;
	branch: string;
	accountNumber: string;
	bank: string;
	cpf: string;
	accountType: AccountType;
	balance: number;
}
