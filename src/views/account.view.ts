import type { AccountModel } from "../models/account.model.js";
import type { AccountType } from "../types/AccountModel.js";

export class AccountView {
	/**
	 * @returns string de conta formatada
	 */
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

	/**
	 * Formata número de conta
	 * @param accountNumber - string do número da conta
	 * @returns string formatada no padrão xxxxxxxxx-x
	 */
	formatAccountNumber(accountNumber: string): string {
		const number = accountNumber.substring(0, accountNumber.length - 1);
		const dv = accountNumber.substring(
			accountNumber.length - 1,
			accountNumber.length,
		);

		return `${number}-${dv}`;
	}

	/**
	 * Formata número de cpf
	 * @param cpf - string do número de cpf
	 * @returns string formatada no padrão xxx.xxx.xxx-xx
	 */
	formatCpf(cpf: string): string {
		const digits = cpf.replace(/[^\d]/g, "");
		if (digits.length < 11) return cpf;

		const firstGroup = digits.substring(0, 3);
		const secondGroup = digits.substring(3, 6);
		const thirdGroup = digits.substring(6, 9);
		const dvGroup = digits.substring(9, 11);
		return `${firstGroup}.${secondGroup}.${thirdGroup}-${dvGroup}`;
	}

	/**
	 * Formata número de valor monetário
	 * @param balance - string do valor monetário
	 * @returns string formatada no padrão R$ x.xxx,xx
	 */
	formatBalance(balance: number): string {
		let formated;
		formated = balance.toFixed(2);

		// separa o valor dos decimais
		const [value = "", decimal] = formated.split(".");
		const valueWithDots: string[] = [];

		// escreve "value" de trás para frente e a cada 3 repetições adiciona um "." ao array "valueWithDots"
		let digit = 0;
		for (let i = value.split("").length; i > 0; i--) {
			valueWithDots.unshift(value[i - 1] ?? "");

			if (digit >= 2) {
				// adiciona um "." enquanto não for o índice final
				if (i > 1) valueWithDots.unshift(".");
				digit = 0;
			} else digit++;
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
