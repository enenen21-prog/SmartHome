const initialLayoutState = {
  view: 'empty', // 'empty' | 'new' | 'list' | 'details'
  isLoadingRooms: true,
  selectedRoomId: null,
  rooms: [],
  devices: [],
};

function layoutReducer(state, action) {
  switch (action.type) {
    case 'ADD_DEVICE': {
      return {
        ...state,
        devices: [action.device, ...state.devices],
      };
    }

    case 'DELETE_DEVICE':
      return {
        ...state,
        devices: state.devices.filter((d) => d.id !== action.id),
      };

    case 'ADD_ROOM': {
      return {
        ...state,
        rooms: [...state.rooms, action.room],
        selectedRoomId: action.room.id,
        view: 'list',
      };
    }

    case 'DELETE_ROOM': {
      const remainingRooms = state.rooms.filter((r) => r.id !== action.id);

      if (remainingRooms.length === 0) {
        return {
          ...state,
          rooms: [],
          selectedRoomId: null,
          view: 'empty',
        };
      }

      const deletedSelected = state.selectedRoomId === action.id;

      return {
        ...state,
        rooms: remainingRooms,
        selectedRoomId: deletedSelected
          ? remainingRooms[0].id
          : state.selectedRoomId,
        view: 'list',
      };
    }

    case 'START_ADD_ROOM':
      return {
        ...state,
        view: 'new',
      };

    case 'CANCEL_ADD_ROOM':
      return state.rooms.length === 0
        ? { ...state, view: 'empty', selectedRoomId: null }
        : { ...state, view: 'list', selectedRoomId: null };

    case 'SELECT_ROOM':
      return {
        ...state,
        selectedRoomId: action.id,
        view: 'details',
      };

    case 'SELECT_MENU':
      action.func(action.option);
      if (action.option !== 'rooms') return state;

      return state.rooms.length === 0
        ? { ...state, view: 'empty', selectedRoomId: null }
        : { ...state, view: 'list' };

    case 'SET_ROOMS':
      return {
        ...state,
        rooms: action.rooms,
        isLoadingRooms: false,
        // Set view to 'list' if rooms exist, otherwise 'empty'
        view: action.rooms.length > 0 ? 'list' : 'empty',
      };

    case 'SET_ROOMS_FAILED':
      return {
        ...state,
        isLoadingRooms: false,
        view: state.rooms.length > 0 ? state.view : 'empty',
      };

    case 'SET_DEVICES':
      return {
        ...state,
        devices: action.devices,
      };

    case 'SET_DEVICES_FAILED':
      return {
        ...state,
        devices: [],
      };

    case 'BACK_TO_ROOMS':
      return state.rooms.length === 0
        ? { ...state, view: 'empty', selectedRoomId: null }
        : { ...state, view: 'list', selectedRoomId: null };

    default:
      return state;
  }
}

export { initialLayoutState, layoutReducer };
