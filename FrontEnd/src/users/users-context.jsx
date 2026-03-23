import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchUsers } from '../api/users.api.js';

const UsersContext = createContext(null);

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [usersError, setUsersError] = useState('');

  const loadUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    setUsersError('');
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      const message = err?.response?.data?.message || 'Failed to load users.';
      setUsersError(message);
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const value = useMemo(
    () => ({
      users,
      isLoadingUsers,
      usersError,
      reloadUsers: loadUsers,
      setUsers,
    }),
    [users, isLoadingUsers, usersError, loadUsers],
  );

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) {
    throw new Error('useUsers must be used within UsersProvider');
  }
  return ctx;
}
