import type { DateObj, DateObjReturnType } from "../types/FormatDate.js";

export class FormatDate {
	/**
	 * Cria string formatada com base na data informada
	 * @param date - Obejto de Data
	 * @param format - String formatadora
	 * @example
	 * // DD = Dia
	 * // MM = Mês
	 * // YYYY = Ano
	 * // HH = Horas
	 * // mm = Minutos
	 * // ss = Segundos
	 *
	 * const date = new Date();
	 * const dateStr = FormatDate.format(date, "DD/MM/YYYY HH:mm:ss");
	 * console.log(dateStr); // imprime: "01/01/2025 12:00:00"
	 * @returns string de data formatada
	 */
	static format(date: Date, format: string = "DD/MM/YYYY HH:mm:ss"): string {
		const dateObj = this.getDateObj(date, "string");

		return format
			.replace(/DD/g, dateObj.day)
			.replace(/MM/g, dateObj.month)
			.replace(/YYYY/g, dateObj.year)
			.replace(/HH/g, dateObj.hours)
			.replace(/mm/g, dateObj.minutes)
			.replace(/ss/g, dateObj.seconds);
	}

	static getDateObj<T extends DateObjReturnType>(
		date: Date,
		type: T,
	): DateObj<T> {
		const get = (value: number, len = 2) =>
			type === "string" ? this.leftZero(value, len) : value;

		return {
			day: get(date.getDate()),
			month: get(date.getMonth() + 1),
			year: get(date.getFullYear(), 4),
			hours: get(date.getHours()),
			minutes: get(date.getMinutes()),
			seconds: get(date.getSeconds()),
		} as DateObj<T>;
	}

	static leftZero = (value: string | number, zeroAmount: number = 2) =>
		value.toString().padStart(zeroAmount, "0");
}
