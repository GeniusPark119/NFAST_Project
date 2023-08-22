import React from "react";
import styled from "styled-components";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
export default function MovePageBtn({ handleClick }) {
  return (
    <GoToContentBtn onClick={handleClick}>
      {/* <FontAwesomeIcon icon={faCaretUp} /> */}
    </GoToContentBtn>
  );
}
// const startAnimation = keyframes`
//   0% {
//     filter: blur(0.1rem);
//     -webkit-transform: translateY(50px);
//             transform: translateY(50px);
//     -webkit-transform-origin: 50% 50%;
//             transform-origin: 50% 50%;
//     text-shadow: none;
//   }
//   100% {
//     -webkit-transform: translateY(0);
//             transform: translateY(0);
//     -webkit-transform-origin: 50% 50%;
//             transform-origin: 50% 50%;
//   }
// `;

const GoToContentBtn = styled.div`
  width: 4vw;
  min-width: 52px;
  height: 4vw;
  min-height: 52px;
  border-radius: 100%;

  position: fixed;
  bottom: 1rem;
  right: 1rem;
  color: var(--color-back);
  background-color: var(--color-main);
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));

  font-size: 2rem;
  line-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50;
  text-decoration: none;

  &:hover {
    cursor: pointer;

    background-color: var(--color-back);
    color: var(--color-main);
  }
`;
