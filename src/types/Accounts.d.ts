import type { AccountModelProps } from "./AccountModel.js";

export interface AccountItem {
	id: number;
	account: AccountModelProps;
}

export interface AccountItemPartial {
	id: number;
	account: Partial<AccountModelProps>;
}

export interface AccountTransact {
	id: number;
	amount: number;
	operation: OperationType;
}
