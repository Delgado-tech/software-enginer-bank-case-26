import { ReflectMetadata } from "../types/ReflectMetadata.js";

/**
 * Decorator de propriedade para restringir comprimento de texto dentro de um intervalo.
 *
 * - Aplica validação automática no `set` da propriedade.
 * - Se o comprimento do texto for menor que `min` ou maior que `max`, lança um erro.
 * - Caso esteja dentro do intervalo, o valor é armazenado em um `WeakMap` privado.
 *
 * @param {number} min - Valor mínimo permitido para o comprimento de texto da propriedade.
 * @param {number} [max=min] - Valor máximo permitido para o comprimento de texto da propriedade.
 *                             Se não for informado, será igual ao `min`.
 *
 * @returns Um decorator que pode ser aplicado em propriedades do tipo string.
 *
 * @example
 * class User {
 *   ‎@MinMaxLength(8, 50)
 *   password!: string;
 * }
 *
 * const u = new User();
 * u.password = '12345678'; // ✅ válido
 * u.password = '123'; // ❌ lança erro: "A propriedade 'password' deve ter no mínimo 8 caracteres."
 */
export function MinMaxLength(min: number, max: number = min) {
	const map = new WeakMap<any, string>();
	return function (target: any, propertyKey: string) {
		Object.defineProperty(target, propertyKey, {
			get() {
				return map.get(this);
			},
			set(val: string) {
				if (val.length < min || val.length > max) {
					const errorPropName =
						Reflect.getMetadata(
							ReflectMetadata.PRINT_PROP_NAME,
							target,
							propertyKey,
						) ?? propertyKey;

					const minMaxText = val.length < min ? "mínimo" : "máximo";
					const minMaxValue = val.length < min ? min : max;

					throw new Error(
						`A propriedade "${errorPropName}" deve ter no ${minMaxText} ${minMaxValue} caracteres.`,
					);
				}

				map.set(this, val);
			},
			configurable: true,
			enumerable: true,
		});
	};
}
