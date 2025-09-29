export type MenuOption = {
	name: string;
	onSelect: (model: MenuModel, view: MenuView) => Promise<void> | void;
};

export type MenuModelProps = {
	header: string;
	headerColor?: string;
	content?: string;
	endContent?: string;
	options: MenuOption[];
};
