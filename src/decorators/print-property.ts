import type { DecoratorFn } from "../types/DecoratorFn.js";
import { ReflectMetadata } from "../types/ReflectMetadata.js";
import "reflect-metadata";

/**
 * Valor mostrado no lugar do nome da variável ao printar um erro
 */
export function PrintPropery(name: string): DecoratorFn {
	return function (target, propertyKey) {
		Reflect.defineMetadata(
			ReflectMetadata.PRINT_PROP_NAME,
			name,
			target,
			propertyKey,
		);
	};
}
