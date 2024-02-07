import styled from "styled-components";

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 6px;
  line-height: 0;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 100rem;

  display: flex;
  align-items: center;
  gap: 4px;

  & svg {
    font-size: 1.5rem;
  }
  &:focus {
    outline: 2px solid var(--blue-600);
  }
`;

export default IconButton;
