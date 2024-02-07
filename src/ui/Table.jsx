import { createContext, useContext } from "react";
import styled from "styled-components";
import Empty from "./Empty";

const TableContext = createContext();

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  align-items: center;
  padding: 1rem 2rem;
  gap: 10px;
`;

const StyledHeader = styled(CommonRow)`
  border-bottom: 1px solid var(--gray-200);

  & > * {
    font-weight: 600;
    color: var(--slate-800);
    text-transform: uppercase;
  }
`;

const StyledBody = styled.div`
  overflow-y: scroll;
  scroll-behavior: smooth;
  max-height: 60vh;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledRow = styled(CommonRow)`
  color: var(--slate-700);
  font-size: 14px;

  &:not(last-child) {
    border-bottom: 1px solid var(--gray-200);
  }
`;

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      {children}
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return <StyledHeader columns={columns}>{children}</StyledHeader>;
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return <StyledRow columns={columns}>{children}</StyledRow>;
}

function Body({ data, render }) {
  //The data is the array we will map
  //The render describe what will happen while the data is mapping, in our case it will render some element

  //Check if the data is empty
  if (!data?.length) return <Empty />;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;

export default Table;
