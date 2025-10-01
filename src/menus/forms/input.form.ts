import enq from "enquirer";
import type { MenuNameId } from "../../types/MenuList.js";
import type { App } from "../../types/App.js";
import type { PromptReturn } from "../../types/PromptReturn.js";
import { Validate } from "../../utils/validate.js";
import type {
	ValidateTestResult,
	ValidationType,
} from "../../types/Validate.js";
import type { InputForm, InputFormReturn } from "../../types/InputForm.js";

const { prompt } = enq;

/**
 * Exibe um prompt de entrada de texto no terminal usando `enquirer`.
 *
 * Permite definir label, valor inicial, validações, estado desabilitado
 * e callback em caso de cancelamento. Se o usuário digitar "x" ou cancelar,
 * a operação é abortada e retorna inválido.
 */
export const inputForm = async ({
	label,
	appInstance,
	validation,
	initial,
	disabled = false,
	onCancel,
}: InputForm): Promise<InputFormReturn> => {
	const input = (await prompt({
		type: "input",
		name: "value",
		message: `${label}:`,
		prefix: ">>",
		initial,
		disabled,
	}).catch(() => appInstance.onExit())) as void | PromptReturn;

	if (!input || input.value.toLowerCase() === "x") {
		onCancel?.();
		return { isValid: false, value: undefined };
	}

	const validate = new Validate(input.value).test(validation);

	return { ...validate, value: input.value };
};
