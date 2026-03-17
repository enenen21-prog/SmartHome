import styled from 'styled-components';

const Label = styled.label`
  display: block;
  margin-bottom: 0.45rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${({ $invalid }) => ($invalid ? '#fecaca' : '#e2e8f0')};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  line-height: 1.5;
  background-color: ${({ $invalid }) =>
    $invalid ? 'rgba(248, 113, 113, 0.12)' : 'rgba(255, 255, 255, 0.06)'};
  color: #f8fafc;
  border: 1px solid
    ${({ $invalid }) => ($invalid ? 'rgba(248, 113, 113, 0.5)' : 'rgba(148, 163, 184, 0.25)')};
  border-radius: 0.75rem;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.25);
  transition: border-color 120ms ease, box-shadow 120ms ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #818cf8;
    box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.35);
  }
`;

export default function Input({ label, invalid, ...props }) {
  return (
    <p>
      <Label $invalid={invalid}>{label}</Label>
      <StyledInput $invalid={invalid} {...props} />
    </p>
  );
}
