import type { MenuModelProps, MenuOption } from "../types/MenuModel.js";

export class MenuModel {
	private _options: MenuOption[];
	private _header: string;

	constructor({ header, options }: MenuModelProps) {
		this._header = header;
		this._options = options;
	}

	public getOption(name: MenuOption["name"]): MenuOption | undefined {
		return this._options.find((op) => op.name === name);
	}

	public get options(): MenuOption[] {
		return this._options;
	}

	public get header(): string {
		return this._header;
	}

	public set options(setter: MenuOption[]) {
		this._options = setter;
	}

	public set header(setter: string) {
		this._header = setter;
	}
}
