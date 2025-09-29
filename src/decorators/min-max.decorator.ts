import { ReflectMetadata } from "../types/ReflectMetadata.js";

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
