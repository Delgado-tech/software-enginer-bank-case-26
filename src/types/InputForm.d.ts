import type { MenuNameId } from "./MenuList.js";
import type { ValidateTestResult, ValidationType } from "./Validate.js";

export type InputForm = {
	appInstance: App<MenuNameId>;
	label: string;
	validation?: Partial<Record<ValidationType, any>>;
	initial?: any;
	disabled?: boolean;
	onCancel?: () => void;
};

export interface InputFormReturn extends ValidateTestResult {
	value: any;
}
