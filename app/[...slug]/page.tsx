// app/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import { getMenuItems } from '@/lib/services';
import { MenuItem } from '@/types/menu';

export default async function DynamicPage({
  params
}: {
  params: { slug: string[] };
}) {
  const { slug } = params;
  const menuItems: MenuItem[] = await getMenuItems();

  // Find the corresponding menu item
  const menuItem = menuItems.find(
    (item) => item.menuName.toLowerCase().replace(/\s+/g, '-') === slug[0]
  );

  if (!menuItem) {
    notFound();
  }

  let title = menuItem.menuName;
  let content = `This is the ${menuItem.menuName} page.`;

  // If there's a submenu, find the corresponding submenu item
  if (slug.length > 1) {
    const subMenuItem = menuItem.subMenus.find(
      (subItem) =>
        subItem.menuName.toLowerCase().replace(/\s+/g, '-') === slug[1]
    );

    if (!subMenuItem) {
      notFound();
    }

    title = subMenuItem.menuName;
    content = `This is the ${subMenuItem.menuName} page under ${menuItem.menuName}.`;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>
      <p>{content}</p>
    </div>
  );
}
