import chalk from "chalk";
import enq from "enquirer";
import type { MenuModel } from "../models/menu.model.js";
import type { Choice } from "../types/Choice.js";
const { prompt } = enq;

const prefix = "::";

export class MenuView {
	async renderMenuAndReturn(model: MenuModel): Promise<string> {
		const choice: Choice = await prompt({
			message: `${chalk.hex(model.headerColor)(this.toHeader(model.header))}${model.content ? `\n${model.content}\n\n` : ""}`,
			name: "value",
			type: "select",
			choices: model.options.map((op, idx) => {
				// aplica uma margem na opção final para melhor UI
				const endMargin = idx === model.options.length - 1 ? "\t\n\n\n" : "";
				return `${op.name}${endMargin}`;
			}),
			prefix,
		});

		// sanitiza o valor da escolha removendo a margem
		return choice.value.replace(/\t\n\n\n/g, "");
	}

	async waitForKeypress(
		message = "[Aperte qualquer tecla para continuar...]",
	): Promise<void> {
		return new Promise((resolve) => {
			process.stdin.setRawMode(true);
			process.stdin.resume();
			process.stdout.write(chalk.gray(`\n\n\n${message}`));

			process.stdin.once("data", () => {
				process.stdin.setRawMode(false);
				process.stdin.pause();
				process.stdout.write("\n");
				resolve();
			});
		});
	}

	async message(text: string): Promise<void> {
		console.log(` └─ ${text}`);
		await this.waitForKeypress();
	}

	private toHeader(header: string): string {
		const hr = `\n${"=".repeat(30)}\n`;
		return `${hr}${header}${hr}`;
	}
}
