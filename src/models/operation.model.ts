import { MinMax } from "../decorators/min-max.decorator.js";
import { PrintPropery } from "../decorators/print-property.js";
import type { OperationModelProps } from "../types/OperationModel.js";
import { OperationType } from "../types/OperationType.js";

export class OperationModel {
	private _operation: OperationType;

	@PrintPropery("Custo da Unidade")
	@MinMax(0, Infinity)
	private _unitCost: number;

	@PrintPropery("Quantidade")
	@MinMax(1, Infinity)
	private _quantity: number;

	constructor({ operation, unitCost, quantity = 1 }: OperationModelProps) {
		this._operation = operation;
		this._unitCost = unitCost;
		this._quantity = quantity;
	}

	/**
	 * Recebe um valor e roda operação configurada nele
	 * @param currentValue - valor a ser manipulado
	 * @returns valor modificado pela operação configurada
	 */
	public run(currentValue: number): number {
		// direção da operação
		const dx = this._operation === OperationType.buy ? -1 : 1;
		return currentValue + this._unitCost * this.quantity * dx;
	}

	// GETTERS
	public get operation(): OperationType {
		return this._operation;
	}

	public get unitCost(): number {
		return this._unitCost;
	}

	public get quantity(): number {
		return this._quantity;
	}

	//SETTERS
	public set operation(setter: OperationType) {
		this._operation = setter;
	}

	public set unitCost(setter: number) {
		this._unitCost = setter;
	}

	public set quantity(setter: number) {
		this._quantity = setter;
	}
}
