import { ReflectMetadata } from "../types/ReflectMetadata.js";

/**
 * Decorator de propriedade para restringir valores numéricos dentro de um intervalo.
 *
 * - Aplica validação automática no `set` da propriedade.
 * - Se o valor atribuído for menor que `min` ou maior que `max`, lança um erro.
 * - Caso esteja dentro do intervalo, o valor é armazenado em um `WeakMap` privado.
 *
 * @param {number} min - Valor mínimo permitido para a propriedade.
 * @param {number} [max=min] - Valor máximo permitido para a propriedade.
 *                             Se não for informado, será igual ao `min`.
 *
 * @returns Um decorator que pode ser aplicado em propriedades numéricas.
 *
 * @example
 * class Account {
 *   ‎@MinMax(1, 1000)
 *   balance!: number;
 * }
 *
 * const a = new Account();
 * a.balance = 50; // ✅ válido
 * a.balance = 1500; // ❌ lança erro: "A propriedade 'balance' deve ser menor que 1000."
 */
export function MinMax(min: number, max: number = min) {
	const map = new WeakMap<any, number>();
	return function (target: any, propertyKey: string) {
		Object.defineProperty(target, propertyKey, {
			get() {
				return map.get(this);
			},
			set(val: number) {
				if (val < min || val > max) {
					const errorPropName =
						Reflect.getMetadata(
							ReflectMetadata.PRINT_PROP_NAME,
							target,
							propertyKey,
						) ?? propertyKey;

					const minMaxText = val < min ? "menor" : "maior";
					const minMaxValue = val < min ? min : max;

					throw new Error(
						`A propriedade "${errorPropName}" deve ser ${minMaxText} que ${minMaxValue}.`,
					);
				}

				map.set(this, val);
			},
			configurable: true,
			enumerable: true,
		});
	};
}
