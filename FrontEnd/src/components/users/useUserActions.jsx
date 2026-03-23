import { useState } from 'react';
import { createUser, deleteUser } from '../../api/users.api.js';

export function useUserActions(reloadUsers) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  async function handleCreateUser(form) {
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      await createUser(form);
      setSuccess('User created successfully.');
      await reloadUsers();
      return true;
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create user.');
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteUser(userId) {
    setDeletingId(userId);

    try {
      await deleteUser(userId);
      await reloadUsers();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete user.');
    } finally {
      setDeletingId(null);
    }
  }

  return {
    error,
    success,
    isSaving,
    deletingId,
    handleCreateUser,
    handleDeleteUser,
    setError,
    setSuccess,
  };
}
