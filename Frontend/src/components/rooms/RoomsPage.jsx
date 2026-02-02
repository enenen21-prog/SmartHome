import { useContext } from 'react';
import { LayoutContext } from '../../layout/layout-context.jsx';

import NewRoom from './NewRoom.jsx';
import NoRoomsAdded from './NoRoomsAdded.jsx';
import RoomsList from './RoomsList.jsx';
import SelectedRoom from './SelectedRoom.jsx';

export default function RoomsPage() {
  const { view } = useContext(LayoutContext);

  switch (view) {
    case 'empty':
      return <NoRoomsAdded />;
    case 'new':
      return <NewRoom />;
    case 'details': {
      return <SelectedRoom/>;
    }
  }

  return <RoomsList />;
}
