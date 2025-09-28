import { MenuModel } from "../models/menu.model.js";
import type { MenuItem } from "../types/MenuList.js";
import type { MenuModelProps } from "../types/MenuModel.js";
import { MenuView } from "../views/menu.view.js";

export class MenuCollectionController<T> {
	private readonly _menuList: Map<T | undefined, MenuModel>;
	private _lastMenuId: T | undefined;
	private _view: MenuView;

	constructor() {
		this._menuList = new Map();
		this._view = new MenuView();
	}

	register({ id, menu }: MenuItem<T>): void {
		this._menuList.set(id, new MenuModel(menu));
	}

	unregister(id: T): void {
		this._menuList.delete(id);
	}

	update(id: T, newOptions: MenuModelProps): void {
		if (this._menuList.has(id)) {
			this._menuList.set(id, new MenuModel(newOptions));
		}
	}

	async render(id: T | undefined) {
		if (!this._lastMenuId && !id) return;

		const menu = this._menuList.get(id);
		if (!menu) {
			await this._view.message("Não foi possível encontrar o menu selecionado!");
			this.goBack();
			return;
		}

		this._lastMenuId = id;

		//limpa o terminal ao carregar nova view
		console.clear();

		const optionName = await this._view.renderMenuAndReturn(menu);
		const option = menu.getOption(optionName);

		if (!option) {
			await this._view.message("");
			this.render(id);
			return;
		}

		option.onSelect();
	}

	goBack(): void {
		if (this._lastMenuId) {
			this.render(this._lastMenuId);
		}
	}
}
