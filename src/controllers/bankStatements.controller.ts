import { BankStatementModel } from "../models/bank-statement.model.js";
import type { BankStatementModelProps } from "../types/BankStatementModel.js";
import type {
	BankStatementItem,
	BankStatementItemPartial,
} from "../types/BankStatements.js";

/**
 * Controlador responsável por gerenciar os extratos bancários da aplicação.
 *
 * - Implementa o padrão Singleton para garantir apenas uma instância global.
 * - Permite criar, atualizar, buscar, listar e remover extratos bancários.
 * - Internamente armazena os extratos em um `Map<number, BankStatementModel>`.
 */
export class BankStatementsController {
	private readonly _bsList: Map<number, BankStatementModel>;
	private currentId: number = 0;
	private static _instance: BankStatementsController | undefined;

	constructor(initialData: BankStatementModelProps[] = []) {
		this._bsList = new Map(
			initialData.map((data) => [this.nextId(), new BankStatementModel(data)]),
		);
	}

	public static get Instance(): BankStatementsController {
		if (this._instance === undefined) {
			this._instance = new BankStatementsController();
		}
		return this._instance;
	}

	nextId(): number {
		return this.currentId++;
	}

	/**
	 * Retorna todos os extratos associados a uma conta específica.
	 *
	 * @param {number | undefined} accountId - Identificador da conta.
	 * @returns {BankStatementItem[]} Lista de extratos da conta.
	 */
	getAll(accountId: number | undefined): BankStatementItem[] {
		return Array.from(this._bsList, ([id, bankStatement]) => ({
			id,
			bankStatement,
		})).filter((bs) => bs.bankStatement.accountId === accountId);
	}

	/**
	 * Retorna um extrato específico de uma conta.
	 *
	 * @param {number | undefined} accountId - Identificador da conta.
	 * @param {number} id - Identificador do extrato.
	 * @returns {BankStatementModel | undefined} O extrato encontrado ou `undefined`.
	 */
	get(
		accountId: number | undefined,
		id: number,
	): BankStatementModel | undefined {
		const bs = this._bsList.get(id);
		return bs?.accountId === accountId ? bs : undefined;
	}

	add(accounts: BankStatementModelProps[]): void {
		accounts.forEach((account) => {
			this._bsList.set(this.nextId(), new BankStatementModel(account));
		});
	}

	update({ id, bankStatement }: BankStatementItemPartial): boolean {
		const prev = this.get(bankStatement.accountId, id);
		if (!prev) return false;

		const next: BankStatementModelProps = {
			accountId: prev.accountId,
			type: bankStatement.type ?? prev.type,
			date: bankStatement.date ?? prev.date,
			payeeName: bankStatement.payeeName ?? prev.payeeName,
			institution: bankStatement.institution ?? prev.institution,
			description: bankStatement.description ?? prev.description,
			amount: bankStatement.amount ?? prev.amount,
		};

		this._bsList.set(id, new BankStatementModel(next));
		return true;
	}

	remove(id: number): void {
		this._bsList.delete(id);
	}
}
