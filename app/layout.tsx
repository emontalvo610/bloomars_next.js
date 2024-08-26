// app/layout.tsx
'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Drawer from './components/Drawer';
import { getLocalStorage, setLocalStorage } from './lib/utils';
import './globals.css';
import { Children, isValidElement, cloneElement } from 'react';
import { MenuProvider } from '@/context/MenuContext';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchSidebarState = async () => {
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
      const host = process.env.VERCEL_URL || 'localhost:3000';
      const response = await fetch(`${protocol}://${host}/api/settings/menu`);
      const data = await response.json();
      setIsSidebarOpen(!data.collapsed);
    };
    fetchSidebarState();

    const storedSidebarState = getLocalStorage('sidebarOpen');
    if (storedSidebarState !== null) {
      setIsSidebarOpen(JSON.parse(storedSidebarState));
    }
  }, []);

  useEffect(() => {
    setLocalStorage('sidebarOpen', isSidebarOpen.toString());
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <html lang="en">
      <body>
        <MenuProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="bg-white shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                  <button
                    onClick={toggleDrawer}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </header>
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                {children}
              </main>
            </div>
            <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
          </div>
        </MenuProvider>
      </body>
    </html>
  );
}
