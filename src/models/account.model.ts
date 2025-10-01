import { MinMaxLength } from "../decorators/min-max-length.decorator.js";
import { PrintPropery } from "../decorators/print-property.js";
import type { AccountModelProps, AccountType } from "../types/AccountModel.js";
import { sanitizeSpaces } from "../utils/sanitizeSpaces.js";

export class AccountModel {
	@PrintPropery("Titular")
	@MinMaxLength(8, 50)
	private _accountHolder: string;

	@PrintPropery("Agência")
	@MinMaxLength(4, 5)
	private _branch: string;

	@PrintPropery("Conta")
	@MinMaxLength(8, 11)
	private _accountNumber: string;

	@PrintPropery("Banco")
	@MinMaxLength(1, 50)
	private _bank: string;

	@PrintPropery("CPF")
	@MinMaxLength(11)
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

	// GETTERS
	public get accountHolder(): string {
		return this._accountHolder;
	}

	public get branch(): string {
		return this._branch;
	}

	public get accountNumber(): string {
		return this._accountNumber;
	}

	public get bank(): string {
		return this._bank;
	}

	public get cpf(): string {
		return this._cpf;
	}

	public get accountType(): AccountType {
		return this._accountType;
	}

	public get balance(): number {
		return this._balance;
	}

	// SETTERS
	public set accountHolder(setter: string) {
		this._accountHolder = sanitizeSpaces(setter);
	}

	public set branch(setter: string) {
		this._branch = sanitizeSpaces(setter);
	}
	public set accountNumber(setter: string) {
		this._accountNumber = sanitizeSpaces(setter);
	}

	public set bank(setter: string) {
		this._bank = sanitizeSpaces(setter);
	}

	public set cpf(setter: string) {
		this._cpf = sanitizeSpaces(setter);
	}

	public set accountType(setter: AccountType) {
		this._accountType = setter;
	}

	public set balance(setter: number) {
		this._balance = setter;
	}
}
