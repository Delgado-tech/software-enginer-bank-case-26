import chalk from "chalk";
import { BankStatementsController } from "../../controllers/bankStatements.controller.js";
import { BankStatementModel } from "../../models/bank-statement.model.js";
import type { GetSubMenu } from "../../types/SubMenu.js";
import { BankStatementView } from "../../views/bank-statement.view.js";
import { select } from "@inquirer/prompts";

const bsView = new BankStatementView();

export const getBankStatementSubMenu: GetSubMenu = async ({
	model,
	view,
	appInstance,
}) => {
	console.clear();

	const bsList = BankStatementsController.Instance.getAll(
		appInstance.sessionAccountId,
	);

	const choices = bsList
		.sort(
			(a, b) => b.bankStatement.date.getTime() - a.bankStatement.date.getTime(),
		)
		.map((bs) => {
			const info = bsView.getStatementInfo(
				new BankStatementModel(bs.bankStatement),
			);
			return `\n${"-".repeat(30)}\n${info}\n`;
		});

	await select({
		message:
			chalk.blue(view.toHeader(model.header)) +
			chalk.gray("(Aperte [Enter] para Voltar)\n"),
		choices,
		pageSize: 22,
		loop: false,
		theme: {
			icon: { cursor: "::::" },
			prefix: chalk.blue("::"),
		},
		instructions: {
			navigation: "Use as setas do teclado para se movimentar",
			pager: "",
		},
	}).catch(() => appInstance.onExit());
};
