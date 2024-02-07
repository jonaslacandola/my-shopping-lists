import { useEffect, useReducer } from "react";
import styled from "styled-components";

import ListHeader from "./ListHeader";
import ItemsTable from "./ItemsTable";
import Button from "./Button";
import Modal from "./Modal";

const StyledCreateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem;
  padding: 1rem;
  width: 80vw;

  @media only screen and (min-width: 764px) {
    & {
      width: 70vw;
    }
  }

  @media only screen and (min-width: 1064px) {
    & {
      width: 50vw;
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem;
`;

const Cancel = styled(Button)`
  background-color: var(--gray-200);
  color: var(--slate-700);
`;

const listState = {
  id: "",
  name: "",
  type: "",
  items: [],
  modifiedAt: "",
};

//State operations are reduce into a reducer and called via actions
function reducer(state, action) {
  switch (action.type) {
    //Sort the items
    case "items/sorted": {
      return { ...state, items: action.payload };
    }
    //Adds a new item object
    case "item/added": {
      return { ...state, items: [...state.items, action.payload] };
    }
    //Save or update the item object
    case "item/updated": {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...action.payload } : item
        ),
      };
    }
    //Delete the specified item object
    case "item/deleted": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    //Set the payload of old value as the default value
    case "list/loaded": {
      return { ...action.payload };
    }
    case "name/updated": {
      return { ...state, name: action.payload };
    }
    case "type/updated": {
      return { ...state, type: action.payload };
    }
  }
}

function CreateUpdateList({ id, lists, onSetLists, onCloseModal }) {
  const [list, dispatch] = useReducer(reducer, listState);
  //Count the fields that are empty
  const emptyFields = list.items.reduce(
    (acc, item) => (!item.name ? (acc += 1) : acc),
    0
  );
  //Cannot save the list if there's no list name, type, or there are empty fields
  const saveNotAllowed = !list.name || !list.type || emptyFields;
  //Get the old values of the list
  const oldList = lists?.filter((curr) => curr.id === id).at(0);
  const currentDate = new Date();

  //Filter the item with the id and set it as the default values
  useEffect(
    function () {
      if (!id) return;
      dispatch({
        type: "list/loaded",
        payload: oldList,
      });
    },
    [id, lists, oldList]
  );

  //Handle saving lists' update and create
  function handleSave() {
    //If there's no id it will create a new list
    if (!id)
      onSetLists((lists) => [
        ...lists,
        {
          ...list,
          id: crypto.randomUUID().toString().substring(0, 16),
          modifiedAt: `${currentDate.toDateString()}`,
        },
      ]);
    //If there's an id it will update the list instead
    if (id)
      onSetLists(
        lists.map((curr) =>
          curr.id === id
            ? { ...list, modifiedAt: `${currentDate.toDateString()}` }
            : curr
        )
      );
  }

  return (
    <>
      <StyledCreateList>
        <ListHeader name={list.name} type={list.type} dispatch={dispatch} />
        <ItemsTable items={list.items} dispatch={dispatch} />
      </StyledCreateList>

      <Container>
        <Modal.Open window="added-list" optionals={{ click: handleSave }}>
          <Button disabled={saveNotAllowed}>Save</Button>
        </Modal.Open>
        <Cancel onClick={onCloseModal}>Cancel</Cancel>
      </Container>
    </>
  );
}

export default CreateUpdateList;
