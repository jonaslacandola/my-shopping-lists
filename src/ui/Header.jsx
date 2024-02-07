import styled from "styled-components";
import { HiOutlinePlus } from "react-icons/hi2";
import IconButton from "./IconButton";
import Modal from "./Modal";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  background: var(--bg-gradient-blue);
`;

const Title = styled.h2`
  margin: 0;
  color: var(--blue-50);
  font-weight: 500;
`;

const AddButton = styled(IconButton)`
  background-color: var(--blue-50);
  color: var(--blue-600);
  transition: all ease-in-out 500ms;

  &:hover,
  &:focus {
    transform: rotate(135deg);
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Title>My Shopping List</Title>

      <Modal.Open window="create-list">
        <AddButton>
          <HiOutlinePlus />
        </AddButton>
      </Modal.Open>
    </StyledHeader>
  );
}

export default Header;
