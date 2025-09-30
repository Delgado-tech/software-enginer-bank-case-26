export type SubMenuProps = {
	model: MenuModel;
	view: MenuView;
	appInstance: App<MenuNameId>;
};

export type GetSubMenu = ({
	model,
	view,
	appInstance,
}: SubMenuProps) => Promise<void>;
