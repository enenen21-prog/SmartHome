import { createContext, useReducer, useEffect } from 'react';
import { fetchRooms } from '../api/rooms.api';
import { initialLayoutState, layoutReducer } from './layout-reducer.js';
import { createLayoutActions } from './layout-actions.js';

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
    ...createLayoutActions(state, dispatch),
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}
