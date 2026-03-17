import { useState } from 'react';
import styled from 'styled-components';
import Input from './Input.jsx';

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
`;

const Card = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 1rem;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.35);
  backdrop-filter: blur(18px);
`;

const LinkButton = styled.a`
  color: #a5b4fc;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: #c7d2fe;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 0.75rem;
  padding: 0.9rem 1rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #f8fafc;
  background: linear-gradient(120deg, #6366f1 0%, #4f46e5 45%, #4338ca 100%);
  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.3);
  transition: transform 120ms ease, box-shadow 120ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 30px rgba(79, 70, 229, 0.4);
  }

  &:focus-visible {
    outline: 2px solid #a5b4fc;
    outline-offset: 2px;
  }
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

  function handleLogin(event) {
    event?.preventDefault();
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
      <Card onSubmit={handleLogin}>
        <ControlContainer>
          <Input
            label="Email address"
            invalid={emailNotValid}
            type="email"
            autoComplete="email"
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
          <Input
            label="Password"
            invalid={passwordNotValid}
            type="password"
            autoComplete="current-password"
            onChange={(event) =>
              handleInputChange('password', event.target.value)
            }
          />
        </ControlContainer>
        {error ? (
          <p className="text-red-200 text-sm mb-3">{error}</p>
        ) : null}
        <SubmitButton type="submit">Sign in</SubmitButton>
      </Card>
    </div>
  );
}
