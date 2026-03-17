import styled from 'styled-components';
import logo from '../../assets/logo.png';

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;

  & img {
    object-fit: contain;
    margin-bottom: 1rem;
    width: 3rem;
    height: 3rem;
    filter: drop-shadow(0 10px 15px rgba(30, 41, 59, 0.5));
  }

  & h1 {
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-align: center;
    text-transform: uppercase;
    color: #f8fafc;
    font-family: 'Fraunces', 'Space Grotesk', serif;
    margin: 0;
  }

  & p {
    text-align: center;
    color: #94a3b8;
    margin: 0;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 2.15rem;
    }
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <img src={logo} alt="A home" />
      <h1>SmartHome</h1>
      <p>Smarter air, better comfort.</p>
    </StyledHeader>
  );
}
