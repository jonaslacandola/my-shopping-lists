import styled from "styled-components";

const Input = styled.input`
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: var(--gray-100);
  border: 1px solid var(--gray-200);
  color: var(--slate-700);

  &:focus {
    outline: 2px solid var(--blue-500);
    outline-offset: 1px;
  }
`;

export default Input;
