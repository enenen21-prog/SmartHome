import { useContext } from 'react';
import { LayoutContext } from '../layout/layout-context.jsx';
import Button from './Button';

const MENU_ITEMS = [
  { id: 'rooms', label: 'Rooms' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'alerts', label: 'Alerts' },
];


export default function MenuSidebar({
  activeOption,
  onSelectOption,
  role,
  onRoleChange,
  userEmail,
}) {
  const { selectMenu } = useContext(LayoutContext);
  return (
    <aside className="w-1/4 px-6 py-16 bg-stone-900 text-stone-50 md:w-56 rounded-r-xl">
      <h2 className="mb-8 font-bold md:text-xl text-stone-200">SmartHome</h2>
      {userEmail ? (
        <p className="text-xs text-stone-400 mb-6 truncate">{userEmail}</p>
      ) : null}
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
      <div className="mt-10">
        <label className="text-xs uppercase tracking-wide text-stone-400">
          Role
        </label>
        <select
          className="mt-2 w-full rounded-md bg-stone-800 border border-stone-700 px-2 py-1 text-sm text-stone-200"
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="reader">Viewer</option>
        </select>
      </div>
    </aside>
  );
}
