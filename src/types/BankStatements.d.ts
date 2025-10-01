import type { BankStatementModelProps } from "./BankStatementModel.js";

export interface BankStatementItem {
	id: number;
	bankStatement: BankStatementModelProps;
}

export interface BankStatementItemPartial {
	id: number;
	bankStatement: Partial<BankStatementModelProps>;
}
