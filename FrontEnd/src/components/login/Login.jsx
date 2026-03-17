import styled from 'styled-components';
import AuthInputs from './AuthInputs.jsx';
import Header from './Header.jsx';

const LoginShell = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f4;
  padding: 2rem;

  #auth-inputs {
    width: 100%;
    max-width: 24rem;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .text-button {
    background: none;
    border: none;
    color: #6b7280;
    font-weight: 600;
  }
`;

export default function Login({ onLogin, error }) {
  return (
    <LoginShell>
      <Header />
      <AuthInputs onLogin={onLogin} error={error} />
    </LoginShell>
  );
}
