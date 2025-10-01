import chalk from "chalk";
import enq from "enquirer";
import type { MenuModel } from "../models/menu.model.js";
import type { PromptReturn } from "../types/PromptReturn.js";
import { prefix } from "../constants.js";
const { prompt } = enq;

export class MenuView {
	/**
	 * Renderiza menu e aguarda o usuário selecionar uma opção
	 * @param model - MenuModel que a partir dele será criado a interface
	 * @returns opção selecionada pelo usuário
	 */
	async renderMenuAndReturn(model: Partial<MenuModel>): Promise<string> {
		let message: string;

		message = chalk.hex(model?.headerColor ?? "")(
			this.toHeader(model?.header ?? ""),
		); // cabeçalho
		message += model.content ? `\n${model.content}\n\n` : ""; // conteúdo
		message += model.endContent ?? ""; // conteúdo pós quebra de linha

		if (!model.options) {
			console.log(message);
			return "";
		}

		const choice: PromptReturn = await prompt({
			message,
			name: "value",
			type: "select",
			choices: model.options.map((op, idx) => {
				// aplica uma margem na opção final para melhor UI
				const endMargin = idx === model.options!.length - 1 ? "\t\n\n\n" : "";
				return `${op.name}${endMargin}`;
			}),
			prefix: prefix.MENU,
		});

		// sanitiza o valor da escolha removendo a margem
		return choice.value.replace(/\t\n\n\n/g, "");
	}

	/**
	 * Pausa CLI até ser pressionado alguma tecla
	 * @param message - mensagem guia a ser mostrada
	 */
	async waitForKeypress(
		message = "[Aperte qualquer tecla para continuar...]",
	): Promise<void> {
		return new Promise((resolve) => {
			process.stdin.setRawMode(true); // ativa modo leitura do terminal
			process.stdin.resume();
			process.stdout.write(chalk.gray(`\n\n\n${message}`));

			process.stdin.once("data", () => {
				// listiner de data
				process.stdin.setRawMode(false);
				process.stdin.pause();
				process.stdout.write("\n");
				resolve();
			});
		});
	}

	async message(text: string = ""): Promise<void> {
		console.log(` └─ ${text}`);
		await this.waitForKeypress();
	}

	/**
	 * Estiliza o texto recebido para formar um cabeçalho
	 * @param header - texto do cabeçalho
	 * @example
	 * const header = new MenuView.toHeader("titulo")
	 * /* string devolvida:
	 * ==============================
	 * titulo
	 * ==============================\n
	 * *\/
	 * @returns Texto em formato de cabeçalho
	 */
	toHeader(header: string): string {
		const hr = `\n${"=".repeat(30)}\n`;
		return `${hr}${header}${hr}`;
	}
}
