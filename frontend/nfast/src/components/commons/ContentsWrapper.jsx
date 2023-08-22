import React from "react";
import styled from "styled-components";

const ContentsWrapperBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// eslint-disable-next-line react/prop-types
export default function ContentsWrapper({ children }) {
  return <ContentsWrapperBox>{children}</ContentsWrapperBox>;
}
