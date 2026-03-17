import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button.jsx';
import Input from './Input.jsx';

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export default function AuthInputs({ onLogin, error }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
    const emailNotValid = !enteredEmail.includes('@');
    const passwordNotValid = enteredPassword.trim().length < 6;
    if (emailNotValid || passwordNotValid) return;
    onLogin({ email: enteredEmail, password: enteredPassword });
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlContainer>
        <Input
          label="Email"
          invalid={emailNotValid}
          type="email"
          onChange={(event) => handleInputChange('email', event.target.value)}
        />
        <Input
          label="Password"
          invalid={passwordNotValid}
          type="password"
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
        />
      </ControlContainer>
      {error ? <p className="text-red-500 text-sm mb-2">{error}</p> : null}
      <div className="actions">
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
