import { useContext } from 'react';
import { LayoutContext } from '../layout/layout-context.jsx';
const MENU_ITEMS = [
  { id: 'rooms', label: 'Rooms' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'users', label: 'Users' },
  { id: 'location', label: 'Location' },
];


export default function MenuSidebar({
  activeOption,
  onSelectOption,
  userEmail,
  onLogout,
}) {
  const { selectMenu } = useContext(LayoutContext);
  return (
    <aside className="w-1/4 px-6 py-12 bg-white/5 border border-white/10 text-slate-100 md:w-64 rounded-2xl backdrop-blur-xl shadow-[0_24px_50px_rgba(15,23,42,0.35)]">
      <h2 className="mb-6 font-semibold md:text-xl tracking-wide text-slate-100">
        SmartHome
      </h2>
      {userEmail ? (
        <p className="text-xs text-slate-400 mb-6 truncate">{userEmail}</p>
      ) : null}
      <ul className="mt-8">
        {MENU_ITEMS.map((item) => {
          let cssClasses =
            'w-full text-left px-3 py-2 rounded-lg transition hover:text-slate-100 hover:bg-white/10';
          cssClasses +=
            item.id === activeOption
              ? ' bg-white/10 text-slate-100'
              : ' text-slate-400';

          return (
            <li key={item.id}>
              <button className={cssClasses} onClick={() => selectMenu(onSelectOption, item.id)}>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className="mt-10 w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-slate-100 hover:bg-white/20"
        onClick={onLogout}
      >
        Logout
      </button>
    </aside>
  );
}
