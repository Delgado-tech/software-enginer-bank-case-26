import chalk from "chalk";
import enq from "enquirer";
import type { PromptReturn } from "../../types/PromptReturn.js";
import type { App } from "../../types/App.js";
import type { MenuNameId } from "../../types/MenuList.js";

const { prompt } = enq;

export const confirmForm = async (
	appInstance: App<MenuNameId>,
): Promise<boolean> => {
	const confirm = (await prompt({
		type: "select",
		name: "value",
		message: "\nConfirmar operação",
		choices: ["Confirmar", chalk.gray("Cancelar")],
		prefix: "::",
	}).catch(() => appInstance.onExit())) as void | PromptReturn;

	return confirm?.value === "Confirmar";
};
