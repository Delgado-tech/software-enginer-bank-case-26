import { MinMax } from "../decorators/min-max.decorator.js";
import { PrintPropery } from "../decorators/print-property.js";
import type {
	OperationModelProps,
	OperationType,
} from "../types/OperationModel.js";

export class OperationModel {
	private _operation: OperationType;

	@PrintPropery("Custo da Unidade")
	@MinMax(0, Infinity)
	private _unitCost: number;

	@PrintPropery("Quantidade")
	@MinMax(0, Infinity)
	private _quantity: number;

	constructor({ operation, unitCost, quantity }: OperationModelProps) {
		this._operation = operation;
		this._unitCost = unitCost;
		this._quantity = quantity;
	}

	public get operation(): OperationType {
		return this._operation;
	}

	public set operation(setter: OperationType) {
		this._operation = setter;
	}

	public get unitCost(): number {
		return this._unitCost;
	}

	public set unitCost(setter: number) {
		this._unitCost = setter;
	}

	public get quantity(): number {
		return this._quantity;
	}

	public set quantity(setter: number) {
		this._quantity = setter;
	}
}
