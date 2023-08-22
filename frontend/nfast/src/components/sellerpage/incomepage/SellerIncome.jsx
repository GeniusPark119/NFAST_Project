import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
import IncomeTable from "./IncomeTable";
import { publishAction } from "../../../redux/actions/publishAction";
import { getSequence } from "../../../storage/Cookie";

function SellerIncome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(publishAction.getIncomeList(getSequence()));
  }, []);
  const incomeList = useSelector((state) => state.publishReducer.incomeList);
  console.log(incomeList);
  return incomeList.length !== 0 ? (
    <div>
      <IncomeTable incomeList={incomeList} />
    </div>
  ) : (
    <div style={{ textAlign: "center", marginTop: 30 }}>
      {" "}
      현재 수익이 없습니다.{" "}
    </div>
  );
}
export default SellerIncome;
