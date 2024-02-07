import styled from "styled-components";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import ItemRow from "./ItemRow";
import Table from "./Table";

const BodyContainer = styled.div`
  height: 35vh;
  overflow-y: scroll;
  background-color: var(--gray-50);
`;

function ItemsTable({ items, dispatch }) {
  //Sensors are to detect different input method
  //In our case we are using a pointer sensor and a touch sensor
  //which activates the drag and drop when a pointing event or a touch is deteced
  const sensors = useSensors(
    useSensor(PointerSensor, {
      //Constraints for the dragging
      //In delay, the dragging will only start after 100ms
      //In tolerance, while not yet activated if the dragging moves away pass 10px it will cancel the operation
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
    useSensor(TouchSensor)
  );

  //This function will be called when dragging ends
  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      let oldIndex; // The current position of the dragging item
      let newIndex; // The new position of the dragging item

      // Loop through the array to search for the items' index
      items.forEach((item, index) => {
        // Place the index of the dragging item to the oldIndex variable
        if (item.id === active.id) oldIndex = index;
        //Place the index of the overring item to the newIndex variable
        if (item.id === over.id) newIndex = index;
      });

      //Dispatch a new array with a switched position of items
      dispatch({
        type: "items/sorted",
        payload: arrayMove(items, oldIndex, newIndex),
      });
    }
  }

  return (
    <div>
      <Table columns="2rem 1fr 1fr 2.5rem">
        <Table.Header>
          <span></span>
          <span>Name</span>
          <span>Quantity</span>
        </Table.Header>

        <BodyContainer>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              disabled={items.length === 1}
              items={items}
              strategy={verticalListSortingStrategy}
            >
              <Table.Body
                data={items}
                render={(item) => (
                  <ItemRow key={item.id} item={item} dispatch={dispatch} />
                )}
              />
            </SortableContext>
          </DndContext>
        </BodyContainer>
      </Table>
    </div>
  );
}

export default ItemsTable;
