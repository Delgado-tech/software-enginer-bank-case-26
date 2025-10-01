import type { AccountModel } from "../models/account.model.js";
import type { AccountType } from "../types/AccountModel.js";

export class AccountView {
	getAccountInfo(model?: AccountModel): string {
		if (!model) return "Conta de usuário não encontrada!";

		let info;

		info = `Titular: ${model.accountHolder}\n`;
		info += `CPF: ${this.formatCpf(model.cpf)}\n\n`;
		info += `Tipo: ${this.formatAccountType(model.accountType)}\n`;
		info += `Banco: ${model.bank}\n`;
		info += `Agência: ${model.branch}\n`;
		info += `Conta: ${this.formatAccountNumber(model.accountNumber)}\n\n`;
		info += `Saldo: ${this.formatBalance(model.balance)}`;

		return info;
	}

	formatAccountNumber(accountNumber: string): string {
		const number = accountNumber.substring(0, accountNumber.length - 1);
		const dv = accountNumber.substring(
			accountNumber.length - 1,
			accountNumber.length,
		);

		return `${number}-${dv}`;
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

	formatBalance(balance: number): string {
		let formated;
		formated = balance.toFixed(2);

		// separa o valor dos decimais
		const [value = "", decimal] = formated.split(".");
		const valueWithDots: string[] = [];

		// escreve "value" de trás para frente e a cada 3 repetições adiciona um "." ao array "valueWithDots"
		let d = 0;
		for (let i = value.split("").length; i > 0; i--) {
			valueWithDots.unshift(value[i - 1] ?? "");

			if (d >= 2) {
				// adiciona um "." enquanto não for o índice final
				if (i > 1) valueWithDots.unshift(".");
				d = 0;
			} else d++;
		}

		return `R$ ${valueWithDots.join("")},${decimal}`;
	}

	formatAccountType(type: AccountType) {
		const formatedType: Record<AccountType, string> = {
			savings: "Poupança",
			checking: "Corrente",
		};

		return formatedType[type];
	}
}
