import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
import MakedTable from "./MakedTable";
import { publishAction } from "../../../redux/actions/publishAction";
import { getSequence } from "../../../storage/Cookie";

function Publish() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(publishAction.getPublishNfastList(getSequence()));
  }, []);

  const publishNfasts = useSelector((state) => state.publishReducer.nfastList);

  console.log(publishNfasts);
  return (
    <div>
      <MakedTable publishNfasts={publishNfasts} />
    </div>
  );
}
export default Publish;
