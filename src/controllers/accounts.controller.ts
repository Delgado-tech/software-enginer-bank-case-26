import { AccountModel } from "../models/account.model.js";
import type { AccountModelProps } from "../types/AccountModel.js";
import type { AccountItem, AccountItemPartial } from "../types/Accounts.js";

export class AccountsController {
	private readonly _accountList: Map<number, AccountModel>;
	private currentId: number = 0;
	private static _instance: AccountsController | undefined;

	constructor(initialData: AccountModelProps[] = []) {
		this._accountList = new Map(
			initialData.map((data) => [this.nextId(), new AccountModel(data)]),
		);
	}

	public static get Instance(): AccountsController {
		if (this._instance === undefined) {
			this._instance = new AccountsController();
		}
		return this._instance;
	}

	nextId(): number {
		return this.currentId++;
	}

	getAll(): AccountItem[] {
		return Array.from(this._accountList, ([id, account]) => ({ id, account }));
	}

	get(id: number): AccountModel | undefined {
		return this._accountList.get(id);
	}

	add(accounts: AccountModelProps[]): void {
		accounts.forEach((account) => {
			this._accountList.set(this.nextId(), new AccountModel(account));
		});
	}

	update({ id, account }: AccountItemPartial): void {
		const prev = this.get(id);
		if (!prev) return;

		const next: AccountModelProps = {
			accountHolder: account.accountHolder ?? prev.accountHolder,
			accountType: account.accountType ?? prev.accountType,
			bank: account.bank ?? prev.bank,
			branch: account.branch ?? prev.branch,
			accountNumber: account.accountNumber ?? prev.accountNumber,
			cpf: account.cpf ?? prev.cpf,
			balance: account.balance ?? prev.balance,
		};

		this._accountList.set(id, new AccountModel(next));
	}

	remove(id: number): void {
		this._accountList.delete(id);
	}
}
