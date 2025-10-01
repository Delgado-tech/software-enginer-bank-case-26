import type { MenuModelProps, MenuOption } from "../types/MenuModel.js";
import { sanitizeSpaces } from "../utils/sanitizeSpaces.js";

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

	// GETTERS
	public get options(): MenuOption[] {
		return this._options;
	}

	public get header(): string {
		return this._header;
	}

	public get content(): string | undefined {
		return this._content;
	}

	public get endContent(): string | undefined {
		return this._endContent;
	}

	public get headerColor(): string {
		return this._headerColor;
	}

	// SETTERS
	public set options(setter: MenuOption[]) {
		this._options = setter;
	}

	public set header(setter: string) {
		this._header = sanitizeSpaces(setter);
	}

	public set content(setter: string) {
		this._content = sanitizeSpaces(setter);
	}

	public set endContent(setter: string) {
		this._endContent = sanitizeSpaces(setter);
	}

	public set headerColor(setter: string) {
		this._headerColor = setter;
	}
}
