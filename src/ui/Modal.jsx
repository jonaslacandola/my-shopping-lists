import { cloneElement, createContext, useContext, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

const ModalContext = createContext();

const transition = keyframes`
    to {  
      backdrop-filter: blur(2px);
      background-color: var(--backdrop-color);
    }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 1000;

  ${(props) =>
    !props.disabled &&
    css`
      animation: ${transition} 200ms ease-in-out forwards;
    `}
`;

const StyledWindow = styled.div`
  position: fixed;

  background-color: white;
  border-radius: 8px;
  overflow-y: scroll;
  width: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  ${(props) =>
    props.position === "center" &&
    css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}

  ${(props) =>
    props.position === "top" &&
    css`
      left: 50%;
      transform: translate(-50%, -50%);

      animation: ${keyframes`
        from {
          top: -10%;
        }
        to {
          top: 8%;
        }
      `} 500ms ease-in-out forwards;
    `}
`;

function Modal({ children }) {
  //This is the current opened window
  const [openWindow, setOpenWindow] = useState("");
  //A function that handles the closing of window
  function close() {
    setOpenWindow("");
  }
  //A function that handles the opening of window
  //it will set the window as the new opened window
  function open(window) {
    setOpenWindow(window);
  }

  return (
    <ModalContext.Provider value={{ openWindow, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, window, optionals }) {
  const { open } = useContext(ModalContext);

  function handleClick() {
    //Additional operations when the window is open
    optionals?.click();
    //Open the window
    open(window);
  }
  //Clone the children node and attaches an on click event with the handleClick function
  return cloneElement(children, { onClick: handleClick });
}

function Window({ children, window, position, disableOverlay }) {
  const { openWindow, close } = useContext(ModalContext);
  //This hook is used to detect if the user clicked outside the window
  //if so, the window will close
  const { ref } = useOutsideClick(close);

  if (openWindow === window)
    //The createPortal function allows to render a node to different part of DOM
    //while still having access to the context of our modal
    //More about the createPortal here https://react.dev/reference/react-dom/createPortal
    return createPortal(
      <Overlay disabled={disableOverlay}>
        <StyledWindow ref={ref} position={position}>
          {cloneElement(children, { onCloseModal: close })}
        </StyledWindow>
      </Overlay>,
      document.body
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
