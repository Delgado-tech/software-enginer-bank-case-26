import type { MenuModelProps, MenuOption } from "../types/MenuModel.js";

export class MenuModel {
	protected _options: MenuOption[];
	protected _header: string;
	protected _headerColor: string;
	protected _content: string;
	protected _endContent: string;

	constructor({
		header,
		content = "",
		options = [],
		headerColor = "#8849eeff",
		endContent = "",
	}: MenuModelProps) {
		this._header = header;
		this._content = content;
		this._options = options;
		this._headerColor = headerColor;
		this._endContent = endContent;
	}

	public getMenuModelProps(): MenuModelProps {
		return {
			header: this._header,
			headerColor: this._headerColor,
			content: this._content,
			options: this._options,
			endContent: this._endContent,
		};
	}

	public getOption(name: MenuOption["name"]): MenuOption | undefined {
		return this._options.find((op) => op.name === name);
	}

	public get options(): MenuOption[] {
		return this._options;
	}

	public set options(setter: MenuOption[]) {
		this._options = setter;
	}

	public get header(): string {
		return this._header;
	}

	public set header(setter: string) {
		this._header = setter;
	}

	public get content(): string | undefined {
		return this._content;
	}

	public set content(setter: string) {
		this._content = setter;
	}

	public get endContent(): string | undefined {
		return this._endContent;
	}

	public set endContent(setter: string) {
		this._endContent = setter;
	}

	public get headerColor(): string {
		return this._headerColor;
	}

	public set headerColor(setter: string) {
		this._headerColor = setter;
	}
}
