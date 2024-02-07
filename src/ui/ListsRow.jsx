import Modal from "./Modal";
import Table from "./Table";
import styled from "styled-components";

const Type = styled.span`
  text-transform: capitalize;
`;

const StyledListRow = styled.div`
  cursor: pointer;
`;

function ListsRow({ list, onSetSearchId }) {
  const { id, name, type, modifiedAt, items } = list;
  const itemsCount = items?.length;
  const formattedType = type?.split("-").join(" ");

  //When the row is clicked this will set the current id of this row
  //to the global search id
  function handleSearchId() {
    onSetSearchId(id);
  }

  return (
    <Modal.Open window="update-list" optionals={{ click: handleSearchId }}>
      <StyledListRow>
        <Table.Row>
          <span>{name}</span>
          {!itemsCount ? (
            <span>This list is empty</span>
          ) : (
            <span>
              There
              {itemsCount > 1
                ? ` are ${itemsCount} items `
                : ` is ${itemsCount} item `}
              in the list
            </span>
          )}

          <Type>{formattedType}</Type>
          <span>{modifiedAt}</span>
        </Table.Row>
      </StyledListRow>
    </Modal.Open>
  );
}

export default ListsRow;
