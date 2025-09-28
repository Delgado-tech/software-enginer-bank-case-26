import { MinMaxLength } from "../decorators/min-max-length.decorator.js";
import { PrintPropery } from "../decorators/print-property.js";
import type { AccountProps, AccountType } from "../types/Account.js";

export class Account {
	@PrintPropery("Titular")
	@MinMaxLength(8, 50)
	private _accountHolder: string;

	@PrintPropery("Agência")
	@MinMaxLength(4)
	private _branch: string;

	@PrintPropery("Conta")
	@MinMaxLength(9)
	private _accountNumber: string;

	@PrintPropery("Banco")
	@MinMaxLength(0, 50)
	private _bank: string;

	@PrintPropery("CPF")
	@MinMaxLength(0, 11)
	private _cpf: string;

	private _accountType: AccountType;

	@PrintPropery("Saldo")
	@MinMaxLength(0, Infinity)
	private _balance: number;

	constructor({
		accountHolder,
		branch,
		accountNumber,
		bank,
		cpf,
		accountType,
		balance,
	}: AccountProps) {
		this._accountHolder = accountHolder;
		this._branch = branch;
		this._accountNumber = accountNumber;
		this._bank = bank;
		this._cpf = cpf;
		this._accountType = accountType;
		this._balance = balance;
	}

	public get accountHolder(): string {
		return this._accountHolder;
	}

	public set accountHolder(setter: string) {
		// Remove espaços extras
		setter = setter.replace(/\s{2,}/g, " ").trim();
		this._accountHolder = setter;
	}
}
