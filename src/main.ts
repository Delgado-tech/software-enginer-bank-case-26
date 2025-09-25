import enq from "enquirer";

const { prompt } = enq;

async function mainMenu() {
	const choice: any = await prompt({
		name: "main",
		message: "=== Menu Principal ===",
		choices: [
			{ name: "b", value: 1, role: "ass", hint: "faça isso", message: "ola" },
			"Opção 2",
			"Submenu",
			"Sair",
		],
		type: "select",
		prefix: "::",
	});

	console.log(choice.main);

	// switch (choice) {
	// 	case "Opção 1":
	// 		console.log(chalk.green("Você escolheu a Opção 1!"));

	// 		break;
	// 	case "Opção 2":
	// 		console.log(chalk.green("Você escolheu a Opção 2!"));
	// 		break;
	// 	case "Submenu":
	// 		await subMenu();
	// 		break;
	// 	case "Sair":
	// 		console.log(chalk.yellow("Saindo..."));
	// 		process.exit(0);
	// }

	// // Volta pro menu principal
	// await mainMenu();
}

// async function subMenu() {
// 	const submenu = new Select({
// 		name: "submenu",
// 		message: chalk.magenta("--- Submenu ---"),
// 		choices: ["Sub-opção A", "Sub-opção B", "Voltar"],
// 	});

// 	const choice = await submenu.run();

// 	switch (choice) {
// 		case "Sub-opção A":
// 			console.log(chalk.green("Você escolheu Sub-opção A!"));
// 			break;
// 		case "Sub-opção B":
// 			console.log(chalk.green("Você escolheu Sub-opção B!"));
// 			break;
// 		case "Voltar":
// 			return;
// 	}

// 	// Volta pro submenu
// 	await subMenu();
// }

// Inicia a aplicação
mainMenu();
