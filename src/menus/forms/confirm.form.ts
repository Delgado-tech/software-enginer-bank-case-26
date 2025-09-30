import chalk from "chalk";
import enq from "enquirer";
import type { PromptReturn } from "../../types/PromptReturn.js";
import type { App } from "../../types/App.js";
import type { MenuNameId } from "../../types/MenuList.js";
import type { MenuView } from "../../views/menu.view.js";
import type { PromptChoice } from "../../types/PromptChoice.js";

const { prompt } = enq;

type ConfirmOption = "Confirmar" | "Cancelar";

export const confirmForm = async (
	appInstance: App<MenuNameId>,
	view: MenuView,
): Promise<boolean> => {
	const choices: PromptChoice<ConfirmOption>[] = [
		"Confirmar",
		{ name: "Cancelar", message: chalk.gray("Cancelar") },
	];

	const confirm = (await prompt({
		type: "select",
		name: "value",
		message: "\nConfirmar operação",
		choices,
		prefix: "::",
	}).catch(() => appInstance.onExit())) as void | PromptReturn<ConfirmOption>;

	if (!confirm || confirm.value === "Cancelar") {
		await view.message("Operação cancelada!");
		return false;
	}

	return true;
};
