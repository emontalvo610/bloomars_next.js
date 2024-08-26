import { MenuItem, Setting } from '../types/menu';

const menus: MenuItem[] = [
  {
    menuName: 'Dashboard',
    icon: 'HomeIcon',
    subMenus: []
  },
  {
    menuName: 'Users',
    icon: 'UserIcon',
    subMenus: [
      {
        menuName: 'All Users',
        icon: 'UsersIcon'
      },
      {
        menuName: 'User Settings',
        icon: 'CogIcon'
      }
    ]
  },
  {
    menuName: 'Settings',
    icon: 'CogIcon',
    subMenus: [
      {
        menuName: 'Profile',
        icon: 'UserCircleIcon'
      },
      {
        menuName: 'Security',
        icon: 'ShieldCheckIcon'
      }
    ]
  },
  {
    menuName: 'Reports',
    icon: 'ChartBarIcon',
    subMenus: []
  }
];

export const settings: Setting = {
  menus,
  collapsed: false,
  answer: 'Hello Every One'
};
