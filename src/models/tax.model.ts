import { MinMax } from "../decorators/min-max.decorator.js";
import { PrintPropery } from "../decorators/print-property.js";

export class TaxModel {
	@PrintPropery("Taxa")
	@MinMax(0, Infinity)
	private _tax: number;

	/**
	 *
	 * @param tax - taxa a ser criada para aplicar em diferentes valores
	 */
	constructor(tax: number = 0) {
		this._tax = tax;
	}

	/**
	 * @param amount - valor a ser aplicado a taxa
	 *
	 * @example
	 * const amount = 100;
	 * const tax = new TaxModel(0.1);
	 * const taxedAmount = tax.applyTo(amount);
	 * // taxa de 10% aplicado ao valor de 100
	 * // taxedAmount passa a ser: 110
	 *
	 * @returns valor taxado
	 */
	applyTo(amount: number): number {
		return amount + amount * this._tax;
	}

	/**
	 * @param beforeAmount - valor sem a taxa aplicada
	 * @param afterAmount - valor com a taxa aplicada
	 * @returns valor da taxa aplicada de um valor para o outro
	 */
	getTaxPercent(beforeAmount: number, afterAmount: number): number {
		return ((afterAmount - beforeAmount) / beforeAmount) * 100;
	}

	// GETTER
	public get tax(): number {
		return this._tax;
	}

	// SETTER
	public set tax(setter: number) {
		this._tax = setter;
	}
}
