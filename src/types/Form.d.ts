export type FormItem = {
	label: string;
	value: string | undefined;
	validation?: Partial<Record<ValidationType, any>>;
};

export type Form<T extends string> = Record<T, FormItem>;

export type FormResult<T extends string> = Record<T, string>;

export type FormReturn<T extends string> = Promise<FormResult<T> | undefined>;

export type FormProps<T extends string> = {
	form: Form<T>;
	view: MenuView;
	appInstance: App<MenuNameId>;
	getHeader: () => void;
};
