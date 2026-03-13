import { createRoom, deleteRoomApi } from '../api/rooms.api';
import { getDevicesByRoom, createDevice, deleteDeviceApi } from '../api/devices.api';

function createLayoutActions(state, dispatch) {
  return {
    addDevice: async (name) => {
      const roomId = Number(state.selectedRoomId);
      if (!Number.isFinite(roomId) || roomId <= 0) {
        throw new Error('No room selected');
      }
      try {
        const createdDevice = await createDevice({
          name,
          roomId,
        });
        dispatch({ type: 'ADD_DEVICE', device: createdDevice });
        return createdDevice;
      } catch (error) {
        console.error('Failed to create device:', error);
        throw error;
      }
    },
    deleteDevice: async (id) => {
      try {
        await deleteDeviceApi(id);
        dispatch({ type: 'DELETE_DEVICE', id });
      } catch (error) {
        console.error('Failed to delete device:', error);
      }
    },
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
      const roomId = Number(id);
      dispatch({ type: 'SELECT_ROOM', id: roomId });

      try {
        const devices = await getDevicesByRoom(roomId);
        dispatch({ type: 'SET_DEVICES', devices });
      } catch (error) {
        console.error('Failed to load devices for room:', error);
        dispatch({ type: 'SET_DEVICES_FAILED' });
      }
    },
    selectMenu: (func, option) =>
      dispatch({ type: 'SELECT_MENU', func, option }),
    backToRooms: () => dispatch({ type: 'BACK_TO_ROOMS' }),
  };
}

export { createLayoutActions };
