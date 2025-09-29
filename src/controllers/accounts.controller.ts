import { AccountModel } from "../models/account.model.js";
import type { AccountModelProps } from "../types/AccountModel.js";
import type { AccountItem } from "../types/Accounts.js";

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

	update({ id, account }: AccountItem): void {
		this._accountList.set(id, new AccountModel(account));
	}

	remove(id: number): void {
		this._accountList.delete(id);
	}
}
