import { MenuModel } from "../models/menu.model.js";
import type { App } from "../types/App.js";
import type { MenuItem } from "../types/MenuList.js";
import { MenuView } from "../views/menu.view.js";

type GetMenuItem<T> = () => MenuItem<T>;

export class MenuCollectionController<T> {
	private readonly _menuList: Map<T | undefined, GetMenuItem<T>>;
	private _lastMenuId: T | undefined;
	private _view: MenuView;

	constructor() {
		this._menuList = new Map();
		this._view = new MenuView();
	}

	register(getter: GetMenuItem<T>): void {
		this._menuList.set(getter().id, getter);
	}

	unregister(id: T): void {
		this._menuList.delete(id);
	}

	update(getter: GetMenuItem<T>): void {
		const id = getter().id;
		if (this._menuList.has(id)) {
			this._menuList.set(id, getter);
		}
	}

	async render(id: T | undefined, appInstance: App<T>) {
		if (!this._lastMenuId && !id) return;

		const menuGetter = this._menuList.get(id);
		if (!menuGetter) {
			await this._view
				.message("Não foi possível encontrar o menu selecionado!")
				.catch(() => appInstance.onExit());
			this.goBack(appInstance);
			return;
		}

		const { menu: menuProps } = menuGetter();
		this._lastMenuId = id;

		const menu = new MenuModel(menuProps);

		//limpa o terminal ao carregar nova view
		console.clear();

		let optionName = "";
		try {
			optionName = await this._view.renderMenuAndReturn(menu);
		} catch (e) {
			appInstance.onExit();
			return;
		}

		const option = menu.getOption(optionName);

		if (!option) {
			await this._view.message("");
			this.render(id, appInstance);
			return;
		}

		option.onSelect(menu, this._view);
	}

	goBack(appInstance: App<T>): void {
		if (this._lastMenuId) {
			this.render(this._lastMenuId, appInstance);
		}
	}
}
