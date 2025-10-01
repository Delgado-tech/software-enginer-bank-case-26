import type { ValidateTestResult, ValidationType } from "../types/Validate.js";

export class Validate {
	private _value: any;
	private _invalid: string | undefined;

	/**
	 * @param value - valor a ser aplicado as validações
	 */
	constructor(value: string) {
		this._value = value;
	}

	setValue(value: any): void {
		this._value = value;
		this._invalid = undefined;
	}

	/**
	 * Método de multi validação
	 * @param tests - objeto podendo conter todos os tipos de validação da classe
	 * @returns - resultado dos testes, caso algum não passe retorna false e motivo da não ter passado
	 */
	test(tests?: Partial<Record<ValidationType, any>>): ValidateTestResult {
		if (tests) {
			for (const [key, value] of Object.entries(tests)) {
				this[key as ValidationType](value);
			}
		}

		if (this._invalid === undefined) return { isValid: true };
		return { isValid: false, reason: this._invalid };
	}

	/** Valida se o valor dentro da classe não é vazio */
	notEmpty(..._: any): this | undefined {
		if (this._value === "" || this._value === undefined || this._value === null) {
			this._invalid = `O valor informado não pode ser vazio!`;
			return;
		}

		return this;
	}

	/** Valida se o valor dentro da classe é um número */
	number(..._: any): this | undefined {
		// regex:
		// se contiver "-" que seja apenas uma vez e no inicio e deve conter pelo menos um número após ela
		// se contiver "." que seja entre dois numeros e não se repita
		// deve conter apenas digitos
		const reg = new RegExp(/^[-]?\d+(\.\d+)?$/);

		if (isNaN(parseFloat(this._value)) || !String(this._value).match(reg)) {
			this._invalid = `O valor informado deve ser um número válido!`;
			return;
		}
		return this;
	}

	/** Valida se o valor dentro da classe é um número maior ou igual a entrada informada */
	min(min: number, ..._: any): this | undefined {
		if (!this.number()) return;

		if (this._value < min) {
			this._invalid = `O valor informado deve ser maior que ${min}!`;
			return;
		}
		return this;
	}

	/** Valida se o valor dentro da classe é um número menor ou igual a entrada informada */
	max(max: number, ..._: any): this | undefined {
		if (!this.number()) return;

		if (this._value > max) {
			this._invalid = `O valor informado deve ser menor que ${max}!`;
			return;
		}
		return this;
	}

	/** Valida se o valor dentro da classe é um texto de comprimento maior ou igual a entrada informada */
	minLen(min: number, ..._: any): this | undefined {
		if (String(this._value).length < min) {
			this._invalid = `O valor informado deve ter no mínimo ${min} caracteres!`;
			return;
		}
		return this;
	}

	/** Valida se o valor dentro da classe é um texto de comprimento menor ou igual a entrada informada */
	maxLen(max: number, ..._: any): this | undefined {
		if (String(this._value).length > max) {
			this._invalid = `O valor informado deve ter no máximo ${max} caracteres!`;
			return;
		}
		return this;
	}
}
