import { useContext } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import NewRoom from './NewRoom.jsx';
import NoRoomsAdded from './NoRoomsAdded.jsx';
import RoomsList from './RoomsList.jsx';
import SelectedRoom from './SelectedRoom.jsx';

export default function RoomsPage({ role }) {
  const { view } = useContext(LayoutContext);

  switch (view) {
    case 'empty':
      return <NoRoomsAdded role={role} />;
    case 'new':
      return <NewRoom role={role} />;
    case 'details': {
      return <SelectedRoom role={role} />;
    }
  }

  return <RoomsList role={role} />;
}
