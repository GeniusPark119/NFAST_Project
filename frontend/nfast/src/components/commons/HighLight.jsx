import React from "react";
import styled from "styled-components";

// eslint-disable-next-line react/prop-types
export default function HighLight({ children }) {
  return (
    <HightLightBox>
      {children}
      <HighLighter />
    </HightLightBox>
  );
}

const HightLightBox = styled.div`
  display: inline-block;
  min-width: fit-content;
`;

const HighLighter = styled.div`
  height: 1vh;
  background-color: var(--color-main);
`;
