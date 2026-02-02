import { useContext } from 'react';
import { LayoutContext } from '../layout/layout-context.jsx';
import Button from './Button';

const MENU_ITEMS = [
  { id: 'rooms', label: 'Rooms' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'alerts', label: 'Alerts' },
];

export default function MenuSidebar({ activeOption, onSelectOption }) {
  const { selectMenu } = useContext(LayoutContext);
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold md:text-xl text-stone-200">SmartHome</h2>
      <ul className="mt-8">
        {MENU_ITEMS.map((item) => {
          let cssClasses =
            'w-full text-left px-2 py-1 rounded-sm  hover:text-stone-200 hover:bg-stone-800';
          cssClasses +=
            item.id === activeOption
              ? ' bg-stone-800 text-stone-200'
              : ' text-stone-400';

          return (
            <li key={item.id}>
              <button className={cssClasses} onClick={() => selectMenu(onSelectOption, item.id)}>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
