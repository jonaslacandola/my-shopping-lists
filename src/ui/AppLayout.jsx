import styled from "styled-components";
import Header from "./Header";
import Modal from "./Modal";
import CreateUpdateList from "./CreateUpdateList";
import ListsTable from "./ListsTable";
import { useLocalStorage } from "../hooks/useLocalStorage";
import SuccessModal from "./SuccessModal";
import { useState } from "react";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;

  & > * {
    padding: 1rem 2rem;
  }

  @media only screen and (min-width: 764px) {
    & > * {
      padding: 1.5rem 6rem;
    }
  }

  @media only screen and (min-width: 1064px) {
    & > * {
      padding: 1.5rem 8rem;
    }
  }
`;

const Main = styled.main`
  overflow: scroll;
  background-color: var(--gray-100);

  & > * {
    flex-grow: 1;
  }
`;

function AppLayout() {
  const [searcId, setSearchId] = useState("");
  const [lists, setLists] = useLocalStorage({
    initialState: [],
    key: "myLists",
  });

  return (
    <Modal>
      <StyledAppLayout>
        <Header />
        <Main>
          <ListsTable lists={lists} onSetSearchId={setSearchId} />
        </Main>
      </StyledAppLayout>

      <Modal.Window window="create-list" position="center">
        <CreateUpdateList onSetLists={setLists} />
      </Modal.Window>
      <Modal.Window window="update-list" position="center">
        <CreateUpdateList id={searcId} lists={lists} onSetLists={setLists} />
      </Modal.Window>
      <Modal.Window window="added-list" position="top" disableOverlay={true}>
        <SuccessModal />
      </Modal.Window>
    </Modal>
  );
}

export default AppLayout;
