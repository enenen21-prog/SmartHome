import styled, { createGlobalStyle } from 'styled-components';
import AuthInputs from './AuthInputs.jsx';
import Header from './Header.jsx';

const GlobalLoginStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
`;

const LoginShell = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1.5rem;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(1200px 800px at 10% -20%, rgba(99, 102, 241, 0.25), transparent 60%),
    radial-gradient(900px 700px at 100% 0%, rgba(14, 165, 233, 0.22), transparent 55%),
    linear-gradient(135deg, #0b0f1a 0%, #111827 45%, #0f172a 100%);
  color: #e5e7eb;
  font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 18rem;
    height: 18rem;
    border-radius: 999px;
    filter: blur(0px);
    opacity: 0.28;
    z-index: 0;
  }

  &::before {
    top: -6rem;
    left: -5rem;
    background: radial-gradient(circle, #6366f1 0%, transparent 70%);
  }

  &::after {
    bottom: -7rem;
    right: -4rem;
    background: radial-gradient(circle, #38bdf8 0%, transparent 70%);
  }

  #auth-inputs {
    width: 100%;
    max-width: 24rem;
  }

  .shell-inner {
    width: 100%;
    max-width: 26rem;
    position: relative;
    z-index: 1;
  }

  .title {
    margin: 1.75rem 0 1.25rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: #f3f4f6;
    letter-spacing: -0.01em;
  }

  .footer {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.9rem;
    color: #9ca3af;
  }

  .footer a {
    color: #818cf8;
    font-weight: 600;
    text-decoration: none;
  }

  .footer a:hover {
    color: #a5b4fc;
  }
`;

export default function Login({ onLogin, error }) {
  return (
    <LoginShell>
      <GlobalLoginStyle />
      <div className="shell-inner">
        <Header />
        <h2 className="title">Sign in to your account</h2>
        <AuthInputs onLogin={onLogin} error={error} />
      </div>
    </LoginShell>
  );
}
