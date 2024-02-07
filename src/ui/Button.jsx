import styled from "styled-components";

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  background-color: var(--blue-600);
  color: var(--blue-50);
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1rem;
  gap: 4px;
  cursor: pointer;
  transition: all ease-in-out 300ms;

  & svg {
    font-size: 20px;
  }

  &:hover {
    background-color: var(--neutral-600);
    color: var(--blue-50);
  }

  &:focus {
    outline: 2px solid var(--blue-600);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--gray-200);
    color: var(--neutral-500);
  }
`;

export default Button;
