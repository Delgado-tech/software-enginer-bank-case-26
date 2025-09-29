import type { MenuModelProps, MenuOption } from "../types/MenuModel.js";

export class MenuModel {
	private _options: MenuOption[];
	private _header: string;
	private _content: string | undefined;

	constructor({ header, content, options }: MenuModelProps) {
		this._header = header;
		this._content = content ?? "";
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

	public get content(): string | undefined {
		return this._content;
	}

	public set options(setter: MenuOption[]) {
		this._options = setter;
	}

	public set header(setter: string) {
		this._header = setter;
	}

	public set content(setter: string) {
		this._content = setter;
	}
}
