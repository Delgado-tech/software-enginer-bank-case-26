export type ValidateTestResult = {
	isValid: boolean;
	reason?: string;
};

export type ValidationType = "notEmpty" | "number" | "min" | "max";
