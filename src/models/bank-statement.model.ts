import { MinMaxLength } from "../decorators/min-max-length.decorator.js";
import { MinMax } from "../decorators/min-max.decorator.js";
import { PrintPropery } from "../decorators/print-property.js";
import type {
	BankStatementModelProps,
	BankStatementModelType,
} from "../types/BankStatementModel.js";
import { sanitizeSpaces } from "../utils/sanitizeSpaces.js";

export class BankStatementModel {
	private readonly _accountId: number;
	private _date: Date; // data da operação

	@PrintPropery("Beneficiário")
	@MinMaxLength(8, 200)
	private _payeeName: string; // nome de quem recebeu ou para quem foi realizado

	@PrintPropery("Instituição")
	@MinMaxLength(3, 200)
	private _institution: string; // banco/instituição envolvida

	@PrintPropery("Valor")
	@MinMax(1, Infinity)
	private _amount: number; // valor da transação

	private _description: string | undefined; // observação opcional

	private _type: BankStatementModelType;

	constructor({
		accountId,
		date,
		payeeName,
		institution,
		amount,
		description,
		type = "out",
	}: BankStatementModelProps) {
		((this._accountId = accountId), (this._date = date));
		this._payeeName = payeeName;
		this._institution = institution;
		this._amount = amount;
		this._description = description;
		this._type = type;
	}

	// GETTERS
	public get accountId(): number {
		return this._accountId;
	}

	public get date(): Date {
		return this._date;
	}

	public get payeeName(): string {
		return this._payeeName;
	}

	public get institution(): string {
		return this._institution;
	}

	public get amount(): number {
		return this._amount;
	}

	public get description(): string {
		return this._description ?? "---";
	}

	public get type(): BankStatementModelType {
		return this._type;
	}

	// SETTERS
	public set date(setter: Date) {
		this._date = setter;
	}

	public set payeeName(setter: string) {
		this._payeeName = sanitizeSpaces(setter);
	}

	public set institution(setter: string) {
		this._institution = sanitizeSpaces(setter);
	}

	public set amount(setter: number) {
		this._amount = setter;
	}

	public set description(setter: string | undefined) {
		this._description = setter ? sanitizeSpaces(setter) : setter;
	}

	public set type(setter: BankStatementModelType) {
		this._type = setter;
	}
}
