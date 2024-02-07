import ListsRow from "./ListsRow";
import Table from "./Table";
import styled from "styled-components";

const StyledListTable = styled.div`
  background-color: var(--gray-50);
  padding: 2rem;
  border-radius: 8px;
  max-width: 70vw;
  margin: auto;
`;

function ListsTable({ lists, onSetSearchId }) {
  return (
    <StyledListTable>
      <Table columns="0.5fr 0.6fr 0.5fr 0.5fr">
        <Table.Header>
          <span>Name</span>
          <span>Items</span>
          <span>Type</span>
          <span>Last Modified</span>
        </Table.Header>
        <Table.Body
          data={lists}
          render={(list, index) => (
            <ListsRow key={index} list={list} onSetSearchId={onSetSearchId} />
          )}
        />
      </Table>
    </StyledListTable>
  );
}

export default ListsTable;
