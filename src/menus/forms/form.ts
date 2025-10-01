import chalk from "chalk";
import { inputForm } from "./input.form.js";
import type {
	Form,
	FormItem,
	FormProps,
	FormResult,
	FormReturn,
} from "../../types/Form.js";
import { confirmForm } from "./confirm.form.js";

/**
 * Exibe e gerencia um formulário interativo no terminal.
 *
 * O formulário solicita ao usuário valores para cada campo definido em `form`,
 * aplicando validações e exibindo mensagens de erro caso necessário.
 * Ao final, pede confirmação antes de retornar os resultados.
 *
 * @returns {FormReturn<T>} Resultado do formulário com as chaves e valores informados,
 * ou `undefined` caso a operação seja cancelada.
 */
export const form = async <T extends string>({
	form,
	view,
	appInstance,
	getConfirmBeforeText,
	getHeader,
}: FormProps<T>): FormReturn<T> => {
	const getForm = async (form: Form<T>): FormReturn<T> => {
		console.clear();
		getHeader();

		const formResult: [key: T, value: string][] = [];
		for (const [key, { label, value, validation = {} }] of Object.entries(
			form,
		) as [T, FormItem][]) {
			if (value === undefined) {
				const input = await inputForm({
					label,
					validation,
					appInstance,
				});

				if (!input.isValid) {
					if (input.value === undefined) {
						await view.message("Operação cancelada!");
						return;
					}

					await view.message(input.reason);
					return getForm(form);
				}

				form[key].value = input.value;
				formResult.push([key, input.value]);

				continue;
			}

			console.log(
				`${chalk.green(">> ")}${chalk.bold(`${label}:`)}${chalk.gray(" · ")}${chalk.green(value)}`,
			);

			formResult.push([key, value]);
		}

		const formResultObj = Object.fromEntries(formResult) as FormResult<T>;

		const confirmed = await confirmForm({
			appInstance,
			view,
			getBeforeText: () => getConfirmBeforeText(formResultObj),
		});
		if (confirmed) return formResultObj;
	};

	return await getForm(form);
};
