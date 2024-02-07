import styled from "styled-components";

const StyledEmpty = styled.p`
  text-align: center;
  color: var(--neutral-500);
`;

function Empty() {
  return <StyledEmpty>The list is empty, start by adding an item</StyledEmpty>;
}

export default Empty;
