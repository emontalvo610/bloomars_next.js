export type SubMenuItem = {
  menuName: string;
  icon: string;
};

export type MenuItem = {
  menuName: string;
  icon: string;
  subMenus: SubMenuItem[];
};

export type Setting = {
  menus: MenuItem[];
  collapsed: boolean;
  answer: string;
};
