import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProgressBarBox = styled.div`
  width: 100%;
  height: 5px;
  background-color: var(--color-back-dark);
  z-index: 1;
`;
const Progress = styled.div`
  width: ${(props) => props.size};
  height: 5px;
  background-color: var(--color-main-dark);
  position: absolute;
`;

// eslint-disable-next-line react/prop-types
export default function ProgressBar({ OuterPageBoxRef }) {
  const [progressed, setProgressed] = useState("0");
  useEffect(() => {
    const wheelHandler = () => {
      // eslint-disable-next-line react/prop-types
      const { scrollTop, scrollHeight, clientHeight } = OuterPageBoxRef.current;
      setProgressed(
        (
          ((scrollTop + clientHeight * Number(progressed) * 0.01) /
            scrollHeight) *
          100
        ).toFixed(1)
      );
    };
    // eslint-disable-next-line react/prop-types
    const boxRefCurrent = OuterPageBoxRef.current;
    // eslint-disable-next-line react/prop-types
    boxRefCurrent.addEventListener("scroll", wheelHandler);
    return () => {
      // eslint-disable-next-line react/prop-types
      boxRefCurrent.removeEventListener("scroll", wheelHandler);
    };
  }, [progressed, OuterPageBoxRef]);
  return (
    <ProgressBarBox>
      <Progress size={`${progressed}%`} />
    </ProgressBarBox>
  );
}
