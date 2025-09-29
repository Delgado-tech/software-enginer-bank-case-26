export type MenuOption = {
	name: string;
	onSelect: () => Promise<void> | void;
};

export type MenuModelProps = {
	header: string;
	headerColor?: string;
	content?: string;
	options: MenuOption[];
};
