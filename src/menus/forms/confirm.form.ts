import chalk from "chalk";
import enq from "enquirer";
import type { PromptReturn } from "../../types/PromptReturn.js";
import type { PromptChoice } from "../../types/PromptChoice.js";
import type {
	ConfirmFormProps,
	ConfirmOption,
} from "../../types/ConfirmForm.js";

const { prompt } = enq;

/**
 * Exibe um prompt de confirmação no terminal usando `enquirer`.
 *
 * Mostra uma mensagem customizável antes da confirmação (`getBeforeText`)
 * e permite ao usuário escolher entre **Confirmar** ou **Cancelar**.
 *
 * - Se o usuário cancelar ou encerrar a operação, uma mensagem é exibida
 *   e a função retorna `false`.
 * - Se o usuário confirmar, a função retorna `true`.
 */
export const confirmForm = async <T>({
	view,
	appInstance,
	getBeforeText,
}: ConfirmFormProps<T>): Promise<boolean> => {
	const choices: PromptChoice<ConfirmOption>[] = [
		"Confirmar",
		{ name: "Cancelar", message: chalk.gray("Cancelar") },
	];

	getBeforeText();

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
