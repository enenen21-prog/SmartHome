import Input from '../Input.jsx';
import SelectInput from '../SelectInput.jsx';
import Button from '../Button.jsx';

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'viewer', label: 'Viewer' },
];

const formClasses = 'grid grid-cols-1 gap-4 max-w-2xl';
const twoColClasses = 'grid grid-cols-1 gap-4 md:grid-cols-2';
const actionsClasses = 'flex items-center gap-3';
const successTextClasses = 'text-sm text-emerald-300';
const errorTextClasses = 'text-sm text-red-300';

export default function UserForm({
  form,
  onChange,
  onSubmit,
  isSaving,
  success,
  error,
}) {
  return (
    <form className={formClasses} onSubmit={onSubmit}>
      <div className={twoColClasses}>
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

      <div className={actionsClasses}>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Create User'}
        </Button>
        {success ? <span className={successTextClasses}>{success}</span> : null}
      </div>
      {error ? <p className={errorTextClasses}>{error}</p> : null}
    </form>
  );
}
