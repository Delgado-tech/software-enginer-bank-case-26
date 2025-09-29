export enum OperationType {
	buy,
	sell,
}

export interface OperationModelProps {
	operation: OperationType;
	unitCost: number;
	quantity: number;
}
