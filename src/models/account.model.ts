import { MinMaxLength } from "../decorators/min-max-length.decorator.js";
import { PrintPropery } from "../decorators/print-property.js";
import type { AccountModelProps, AccountType } from "../types/AccountModel.js";

export class AccountModel {
	@PrintPropery("Titular")
	@MinMaxLength(8, 50)
	private _accountHolder: string;

	@PrintPropery("Agência")
	@MinMaxLength(4)
	private _branch: string;

	@PrintPropery("Conta")
	@MinMaxLength(8, 11)
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
	}: AccountModelProps) {
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

	public get branch(): string {
		return this._branch;
	}

	public set branch(setter: string) {
		this._branch = setter;
	}

	public get accountNumber(): string {
		return this._accountNumber;
	}

	public set accountNumber(setter: string) {
		this._accountNumber = setter;
	}

	public get bank(): string {
		return this._bank;
	}

	public set bank(setter: string) {
		this._bank = setter;
	}

	public get cpf(): string {
		return this._cpf;
	}

	public set cpf(setter: string) {
		this._cpf = setter;
	}

	public get accountType(): AccountType {
		return this._accountType;
	}

	public set accountType(setter: AccountType) {
		this._accountType = setter;
	}

	public get balance(): number {
		return this._balance;
	}

	public set balance(setter: number) {
		this._balance = setter;
	}
}
