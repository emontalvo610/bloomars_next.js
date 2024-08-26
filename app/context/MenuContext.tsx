// app/MenuContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { MenuItem } from '@/types/menu';

interface MenuContextType {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
      const host = process.env.VERCEL_URL || 'localhost:3000';
      const response = await fetch(`${protocol}://${host}/api/settings/menu`);
      const data = await response.json();
      setMenuItems(data);
    };
    fetchMenuItems();
  }, []);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
