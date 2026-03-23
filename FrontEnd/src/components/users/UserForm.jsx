import Input from '../Input.jsx';
import SelectInput from '../SelectInput.jsx';
import Button from '../Button.jsx';

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'viewer', label: 'Viewer' },
];

export default function UserForm({
  form,
  onChange,
  onSubmit,
  isSaving,
  success,
  error,
}) {
  return (
    <form className="grid grid-cols-1 gap-4 max-w-2xl" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="First Name"
          value={form.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          maxLength={40}
        />
        <Input
          label="Last Name"
          value={form.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          maxLength={40}
        />
      </div>
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => onChange('email', e.target.value)}
        maxLength={120}
      />
      <Input
        label="Password"
        type="password"
        value={form.password}
        onChange={(e) => onChange('password', e.target.value)}
        maxLength={64}
      />
      <SelectInput
        label="Role"
        value={form.role}
        onChange={(e) => onChange('role', e.target.value)}
        options={ROLE_OPTIONS}
      />

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Create User'}
        </Button>
        {success ? (
          <span className="text-sm text-emerald-300">{success}</span>
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </form>
  );
}
