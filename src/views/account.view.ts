import type { AccountModel } from "../models/account.model.js";

export class AccountView {
	renderAccountInfo(model?: AccountModel): string {
		if (!model) return "Conta de usuário não encontrada!";

		let info;

		info = `Titular: ${model.accountHolder}\n`;
		info += `CPF: ${this.formatCpf(model.cpf)}\n\n`;
		info += `Tipo: ${model.accountType}\n`;
		info += `Banco: ${model.accountHolder}\n`;
		info += `Agência: ${model.branch}\n`;
		info += `Conta: ${model.accountNumber}\n\n`;
		info += `Saldo: ${model.balance}`;

		return info;
	}

	formatCpf(cpf: string): string {
		const digits = cpf.replace(/[^\d]/g, "");
		if (digits.length < 11) return cpf;

		const firstGroup = digits.substring(0, 3);
		const secondGroup = digits.substring(3, 6);
		const thirdGroup = digits.substring(6, 9);
		const dvGroup = digits.substring(9, 11);
		return `${firstGroup}.${secondGroup}.${thirdGroup}-${dvGroup}`;
	}
}
