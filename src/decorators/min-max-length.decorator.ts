import { ReflectMetadata } from "../types/ReflectMetadata.js";

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
