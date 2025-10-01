import chalk from "chalk";
import type { BankStatementModel } from "../models/bank-statement.model.js";
import type { BankStatementModelType } from "../types/BankStatementModel.js";
import { FormatDate } from "../utils/formatDate.js";
import { AccountView } from "./account.view.js";

const accountView = new AccountView();

export class BankStatementView {
	/**
	 * @returns string de extrato formatada
	 */
	getStatementInfo(model?: BankStatementModel) {
		if (!model) return "Registro de extrato não encontrado!";

		let info;

		const amountColor = model.type === "out" ? "#8b8b8bff" : "#57eb57ff";

		info = `${this.formatStatementType(model.type)}\n`;
		info += `Data: ${FormatDate.format(model.date)}\n\n`;
		info += `Benefeciário: ${model.payeeName}\n`;
		info += `Instituição: ${model.institution}\n`;
		info += `Descrição: ${model.description}\n\n`;
		info += `Valor: ${chalk.hex(amountColor)(accountView.formatBalance(model.amount))}`;

		return info;
	}

	formatStatementType(type: BankStatementModelType): string {
		return type === "in" ? "Entrada" : "Saída";
	}
}
