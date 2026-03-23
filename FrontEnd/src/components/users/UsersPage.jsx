import { useEffect, useRef, useState } from 'react';
import Button from '../Button.jsx';
import UserForm from './UserForm.jsx';
import ConfirmModal from '../ConfirmModal.jsx';
import { useUsers } from '../../users/users-context.jsx';
import { useUserActions } from './useUserActions.jsx';
import UserItem from './UserItem.jsx';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'viewer',
};

export default function UsersPage({ role }) {
  const { users, isLoadingUsers, usersError, reloadUsers } = useUsers();
  const isAdmin = role === 'admin';
  const [form, setForm] = useState(INITIAL_FORM);
  const [showForm, setShowForm] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const confirmRef = useRef();

  const {
    error,
    success,
    isSaving,
    deletingId,
    handleCreateUser,
    handleDeleteUser,
    setError,
    setSuccess,
  } = useUserActions(reloadUsers);

  useEffect(() => {
    if (usersError) setError(usersError);
  }, [usersError, setError]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const created = await handleCreateUser(form);
    if (created) {
      setForm(INITIAL_FORM);
      setShowForm(false);
    }
  }

  function handleDeleteClick(user) {
    setPendingUser(user);
    confirmRef.current.open();
  }

  async function handleConfirmDelete() {
    if (!pendingUser) return;

    await handleDeleteUser(pendingUser.id);
    setPendingUser(null);
  }

  return (
    <section className="space-y-6">
      <ConfirmModal
        ref={confirmRef}
        title="Delete User"
        message={
          pendingUser
            ? `Are you sure you want to delete ${pendingUser.firstName} ${pendingUser.lastName}?`
            : 'Are you sure you want to delete this user?'
        }
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
      />
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-100">Users</h1>
          {isAdmin ? (
            <Button type="button" onClick={() => setShowForm((prev) => !prev)}>
              {showForm ? 'Close' : '+ Add User'}
            </Button>
          ) : null}
        </div>
        <p className="text-sm text-slate-400 mt-2">
          Add new users and assign their role.
        </p>
      </div>

      {showForm && isAdmin ? (
        <UserForm
          form={form}
          onChange={updateField}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          success={success}
          error={error}
        />
      ) : null}

      {isLoadingUsers ? (
        <p className="text-sm text-slate-300">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-sm text-slate-300">No users yet.</p>
      ) : (
        <ul className="rounded-2xl bg-white/5 border border-white/10 shadow-[0_20px_40px_rgba(15,23,42,0.25)] divide-y divide-white/10">
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              isAdmin={isAdmin}
              onDelete={handleDeleteClick}
              isDeleting={deletingId === user.id}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
