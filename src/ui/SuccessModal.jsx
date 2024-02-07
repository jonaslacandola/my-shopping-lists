import styled from "styled-components";
import { HiCheckCircle, HiXMark } from "react-icons/hi2";
import IconButton from "./IconButton";
import { useEffect } from "react";

const StyledSuccess = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1.5rem;
`;

const IconSuccess = styled(HiCheckCircle)`
  color: var(--lime-600);
  font-size: 2rem;
`;

function SuccessModal({ onCloseModal }) {
  //Runs an effect of setTimeOut, when timed out it will close this success modal
  //and remove the setTimeOut effect on unmount
  useEffect(
    function () {
      const end = setTimeout(onCloseModal, 3000);
      return () => clearTimeout(end);
    },
    [onCloseModal]
  );

  return (
    <StyledSuccess>
      <IconSuccess />
      <p>Shopping List Saved!</p>
      <IconButton onClick={onCloseModal}>
        <HiXMark />
      </IconButton>
    </StyledSuccess>
  );
}

export default SuccessModal;
