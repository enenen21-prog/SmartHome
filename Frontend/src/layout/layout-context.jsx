import { createContext, useReducer, useEffect } from 'react';
import { fetchRooms, createRoom, deleteRoomApi } from '../api/rooms.api';
import { getDevicesByRoom, createDevice } from '../api/devices.api';

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
    addDevice: async (name) => {
      if (!state.selectedRoomId) {
        throw new Error('No room selected');
      }
      try {
        const createdDevice = await createDevice({
          name,
          roomId: state.selectedRoomId,
        });
        dispatch({ type: 'ADD_DEVICE', device: createdDevice });
        return createdDevice;
      } catch (error) {
        console.error('Failed to create device:', error);
        throw error;
      }
    },
    deleteDevice: (id) => dispatch({ type: 'DELETE_DEVICE', id }),
    addRoom: async (roomData) => {
      try {
        const createdRoom = await createRoom(roomData);
        dispatch({ type: 'ADD_ROOM', room: createdRoom });
      } catch (error) {
        console.error('Failed to create room:', error);
      }
    },
    deleteRoom: async (id) => {
      try {
        await deleteRoomApi(id);
        dispatch({ type: 'DELETE_ROOM', id });
      } catch (error) {
        console.error('Failed to delete room:', error);
      }
    },
    startAddRoom: () => dispatch({ type: 'START_ADD_ROOM' }),
    cancelAddRoom: () => dispatch({ type: 'CANCEL_ADD_ROOM' }),
    selectRoom: async (id) => {
      // 🔹 CHANGED
      dispatch({ type: 'SELECT_ROOM', id });

      try {
        const devices = await getDevicesByRoom(id); // 🔹 NEW: fetch devices from backend
        dispatch({ type: 'SET_DEVICES', devices }); // 🔹 NEW: update state
      } catch (error) {
        console.error('Failed to load devices for room:', error);
        dispatch({ type: 'SET_DEVICES_FAILED' }); // 🔹 NEW
      }
    },
    selectMenu: (func, option) =>
      dispatch({ type: 'SELECT_MENU', func, option }),
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
