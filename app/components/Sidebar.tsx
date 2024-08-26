// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MenuItem, SubMenuItem } from '../types/menu';
import { useMenu } from '@/context/MenuContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const pathname = usePathname();

  const toggleExpand = (itemName: string) => {
    setExpandedItems((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  const { menuItems } = useMenu();

  const getMenuItemPath = (
    item: MenuItem,
    subItem: SubMenuItem | null = null
  ) => {
    const basePath = item.menuName.toLowerCase().replace(/\s+/g, '-');
    if (subItem) {
      return `/${basePath}/${subItem.menuName
        .toLowerCase()
        .replace(/\s+/g, '-')}`;
    }
    return `/${basePath}`;
  };

  const isActive = (item: MenuItem, subItem: SubMenuItem | null = null) => {
    const itemPath = getMenuItemPath(item, subItem);
    return pathname === itemPath;
  };

  return (
    <aside
      className={`bg-gray-800 text-white w-64 min-h-screen`}
      style={{ width: isOpen ? '256px' : '90px' }}
    >
      <nav className="p-4" style={{ display: isOpen ? 'block' : 'none' }}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.menuName} className="mb-2">
              <Link href={getMenuItemPath(item)}>
                <span
                  className={`flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer ${
                    isActive(item) ? 'bg-gray-700' : ''
                  }`}
                  onClick={() =>
                    item.subMenus.length > 0 && toggleExpand(item.menuName)
                  }
                >
                  <i className={`mr-2 ${item.icon}`}></i>
                  {item.menuName}
                  {item.subMenus.length > 0 && (
                    <svg
                      className={`ml-auto w-4 h-4 transition-transform ${
                        expandedItems[item.menuName]
                          ? 'transform rotate-180'
                          : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </Link>
              {item.subMenus.length > 0 && expandedItems[item.menuName] && (
                <ul className="ml-4 mt-2">
                  {item.subMenus.map((subItem) => (
                    <li key={subItem.menuName} className="mb-2">
                      <Link href={getMenuItemPath(item, subItem)}>
                        <span
                          className={`flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer ${
                            isActive(item, subItem) ? 'bg-gray-700' : ''
                          }`}
                        >
                          <i className={`mr-2 ${subItem.icon}`}></i>
                          {subItem.menuName}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="mb-2">
            <Link href="/admin">
              <span className="flex items-center p-2 rounded hover:bg-gray-700 cursor-pointer">
                <i className="mr-2 fas fa-cog"></i>
                Admin
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={toggleSidebar}
        className="absolute bottom-4 left-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
    </aside>
  );
}
