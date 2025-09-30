import enq from "enquirer";
import type { MenuNameId } from "../../types/MenuList.js";
import type { App } from "../../types/App.js";
import type { PromptReturn } from "../../types/PromptReturn.js";
import { Validate } from "../../utils/validate.js";
import type {
	ValidateTestResult,
	ValidationType,
} from "../../types/Validate.js";

const { prompt } = enq;

type InputForm = {
	appInstance: App<MenuNameId>;
	label: string;
	validation?: Partial<Record<ValidationType, any>>;
	initial?: any;
	disabled?: boolean;
	onCancel?: () => void;
};

interface InputFormReturn extends ValidateTestResult {
	value: any;
}

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
