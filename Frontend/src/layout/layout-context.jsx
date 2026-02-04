import { createContext, useReducer, useEffect } from 'react';
import { fetchRooms, createRoom } from '../api/rooms.api';

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
      const newDevice = {
        id: Math.random(),
        text: action.text,
        roomId: state.selectedRoomId,
      };

      return {
        ...state,
        devices: [newDevice, ...state.devices],
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

    default:
      return state;
  }
}

export const LayoutContext = createContext(null);

export function LayoutContextProvider({ children }) {
  const [state, dispatch] = useReducer(layoutReducer, initialLayoutState);

  useEffect(() => {
    async function loadRooms() {
      try {
        const data = await fetchRooms();
        dispatch({ type: 'SET_ROOMS', rooms: data });
      } catch (error) {
        console.error('Could not load rooms:', error);
        dispatch({ type: 'SET_ROOMS_FAILED' });
      }
    }
    loadRooms();
  }, []);

  const value = {
    ...state,
    addDevice: (text) => dispatch({ type: 'ADD_DEVICE', text }),
    deleteDevice: (id) => dispatch({ type: 'DELETE_DEVICE', id }),
    addRoom: async (roomData) => {
      const createdRoom = await createRoom(roomData);
      dispatch({ type: 'ADD_ROOM', room: createdRoom });
    },
    deleteRoom: (id) => dispatch({ type: 'DELETE_ROOM', id }),
    startAddRoom: () => dispatch({ type: 'START_ADD_ROOM' }),
    cancelAddRoom: () => dispatch({ type: 'CANCEL_ADD_ROOM' }),
    selectRoom: (id) => dispatch({ type: 'SELECT_ROOM', id }),
    selectMenu: (func, option) =>
      dispatch({ type: 'SELECT_MENU', func, option }),
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
