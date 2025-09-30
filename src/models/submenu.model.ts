import type { SubMenuProps } from "../types/SubMenu.js";
import { MenuModel } from "./menu.model.js";

export class SubMenuModel extends MenuModel {
	private _subMenuName: string;

	constructor({ model, subMenuName }: SubMenuProps) {
		model.header = `${model.header}\n::${subMenuName}`;

		super(model.getMenuModelProps());
		this._subMenuName = subMenuName ?? "";
	}

	public get subMenuName(): string {
		return this._subMenuName;
	}

	public set subMenuName(setter: string) {
		this._subMenuName = setter;
	}
}
