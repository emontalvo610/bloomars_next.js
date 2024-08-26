'use client';

import JsonViewer from '@/components/JsonViewer';
import TextArea from '@/components/TextArea';
import { useState, useEffect } from 'react';
import { useMenu } from '@/context/MenuContext';
import { MenuItem } from '@/types/menu';

const Admin = () => {
  const [answer, setAnswer] = useState<string>();
  const { menuItems, setMenuItems } = useMenu();

  const getAnswers = async () => {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const res = await fetch(`${protocol}://${host}/api/settings/answer`, {
      cache: 'no-store'
    });
    if (!res.ok) {
      throw new Error('Failed to fetch menu items');
    }
    const data = await res.json();
    setAnswer(data as string);
  };

  useEffect(() => {
    getAnswers();
  }, []);

  const updateMenuItems = (newMenuItems: MenuItem[]) => {
    setMenuItems(newMenuItems);
  };

  return (
    <div className="bg-neutral-200 h-[100vh] flex px-12 py-6">
      <div className="w-full flex flex-col gap-4 ml-4">
        <div className="bg-white p-4">
          <h3 className="text-2xl mb-4">Menu Setting</h3>
          <JsonViewer initialJson={menuItems} onUpdate={updateMenuItems} />
        </div>
        <div className="bg-white p-4">
          <h3 className="text-2xl mb-4">Prompt Setting</h3>
          <TextArea initialValue={answer} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
