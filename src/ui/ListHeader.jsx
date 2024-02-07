import styled from "styled-components";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { HiPlus } from "react-icons/hi2";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    flex-grow: 1;
  }

  @media only screen and (min-width: 764px) {
    & {
      flex-direction: row;
      justify-content: space-between;
      gap: 2rem;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & span {
    color: var(--slate-600);
  }
`;

function ListHeader({ name, type, dispatch }) {
  //Handle addition of new item row
  function handleAddRow() {
    //Create a new item object
    const newItem = {
      //Generate a random id
      id: crypto.randomUUID().toString().substring(0, 8),
      name: "",
      quantity: 1,
    };
    //Dispatch to add new item to the items array
    dispatch({ type: "item/added", payload: newItem });
  }
  //Handle the updating of list name
  function handleNameChange(event) {
    const { value } = event.target;
    dispatch({ type: "name/updated", payload: value });
  }
  //Handle the updating of list type
  function handleTypeChange(event) {
    const { value } = event.target;
    dispatch({ type: "type/updated", payload: value });
  }

  return (
    <>
      <Container>
        <InputContainer>
          <span>List name</span>
          <Input type="text" value={name} onChange={handleNameChange} />
        </InputContainer>
        <InputContainer>
          <span>Type</span>
          <Select value={type} onChange={handleTypeChange}>
            <option hidden>Select from options</option>
            <option value="grocery">Grocery</option>
            <option value="home-goods">Home Goods</option>
            <option value="hardware">Hardware</option>
          </Select>
        </InputContainer>
      </Container>
      <Button onClick={handleAddRow}>
        <HiPlus />
        Add new item
      </Button>
    </>
  );
}

export default ListHeader;
