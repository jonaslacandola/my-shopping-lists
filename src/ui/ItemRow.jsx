import { HiBars3, HiMinusCircle } from "react-icons/hi2";
import Input from "./Input";
import Select from "./Select";
import Table from "./Table";
import IconButton from "./IconButton";
import styled from "styled-components";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const RemoveButton = styled(IconButton)`
  & svg {
    font-size: 2rem;
    color: var(--red-600);
  }
`;

const StyledRow = styled.div`
  background-color: white;
`;

const IconBar = styled(HiBars3)`
  font-size: 24px;
  &:hover {
    cursor: grab;
  }
`;

function ItemRow({ item, dispatch }) {
  const { id, name, quantity } = item;
  const [fieldName, setFieldName] = useState(name);
  const [fieldQuantity, setFieldQuantity] = useState(quantity);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  //This is called when delete button is click
  function handleDelete() {
    dispatch({ type: "item/deleted", payload: id });
  }
  //This is called when the input blurs
  function handleUpdate() {
    const updatedItem = { id, name: fieldName, quantity: fieldQuantity };
    dispatch({ type: "item/updated", payload: updatedItem });
  }

  return (
    <StyledRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Table.Row>
        <IconBar />
        <Input
          type="text"
          value={fieldName}
          onChange={(e) => {
            e.stopPropagation();
            setFieldName(e.target.value);
          }}
          onBlur={handleUpdate}
        />
        <Select
          value={fieldQuantity}
          onChange={(e) => setFieldQuantity(e.target.value)}
          onBlur={handleUpdate}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
        </Select>
        <RemoveButton onClick={handleDelete}>
          <HiMinusCircle />
        </RemoveButton>
      </Table.Row>
    </StyledRow>
  );
}

export default ItemRow;
