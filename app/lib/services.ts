import { MenuItem } from '@/types/menu';

export const getMenuItems = async () => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCEL_URL || 'localhost:3000';
  const res = await fetch(`${protocol}://${host}/api/settings/menu`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return res.json();
};

export const updateMenus = async (newMenus: MenuItem[]) => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCEL_URL || 'localhost:3000';
  const res = await fetch(`${protocol}://${host}/api/settings/menu`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ menus: newMenus }),
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return res.json();
};

export const getAnswers = async () => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCEL_URL || 'localhost:3000';
  const res = await fetch(`${protocol}://${host}/api/settings/answer`, {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return res.json();
};

export const updateAnswer = async (newAnswer?: string) => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCEL_URL || 'localhost:3000';
  const res = await fetch(`${protocol}://${host}/api/settings/answer`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ answer: newAnswer }),
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch menu items');
  }
  return res.json();
};
