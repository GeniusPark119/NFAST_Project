/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import styled, { keyframes } from "styled-components";
import StoreSwitch from "./StoreSwitch";
import { storeAction } from "../../redux/actions/storeAction";
import { toStringByFormatting } from "../../api/transDate";
import { getSequence } from "../../storage/Cookie";

const slideUpAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const Wrapper = styled.div`
  padding-top: 0px;
  background-color: white;
  position: relative;

  left: 0;
  right: 0;
  height: calc(100% - 136px); // Height of the BottomNavigation component
  animation: ${slideUpAnimation} 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  h2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 0;
    margin-bottom: 50px;
    width: 100%;
    height: 100px;
    background-color: #bcb6ff;
    color: white;
  }
`;

function CalendarList() {
  const { storeSequence } = useParams();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    storeSequence,
    nfastMealType: 0,
    nfastDate: toStringByFormatting(new Date()),
  });
  const [value, setValue] = useState(new Date());
  const [showButtons, setShowButtons] = useState(false);
  const [mealType, setMealType] = useState(0);
  const amount = useSelector((state) => state.storepageReducer.amount);
  const flag = useSelector((state) => state.storepageReducer.flag);

  const handleDayClick = (date) => {
    console.log(inputs);
    console.log("day check", date.getFullYear());
    const dateForm = toStringByFormatting(date);
    console.log("date", dateForm);
    dispatch(storeAction.saveHandler(0));
    setInputs({ ...inputs, nfastDate: dateForm });
    setValue(date);
    setShowButtons(true); // 한 번만 눌러서 버튼이 나오도록 수정
  };
  useEffect(() => {
    console.log("checkINININ");
    console.log(toStringByFormatting(new Date()));
    dispatch(storeAction.getPurchaseList(inputs));
  }, []);

  useEffect(() => {
    console.log("check");
    dispatch(storeAction.getPurchaseList(inputs));
  }, [inputs]);

  useEffect(() => {
    console.log("check");
    setInputs({ ...inputs, nfastMealType: mealType });
  }, [mealType]);

  useEffect(() => {
    if (flag === 1) {
      dispatch(storeAction.postPurchase(inputs, amount, getSequence()));
    }
  }, [flag]);

  // const handleMealChoice = (meal) => {
  //   setShowButtons(false);
  //   // 여기서 API 호출이나 데이터를 가져오는 로직을 구현할 수 있습니다.
  //   // 예를 들어, 밑에 있는 코드를 사용할 수 있습니다.
  //   const data = {
  //     lunch: "치킨",
  //     dinner: "피자",
  //   };
  //   setMealData(data[meal]);
  // };

  return (
    <Wrapper>
      <h4>구매하기</h4>
      <Calendar onClickDay={handleDayClick} value={value} />
      {showButtons && <StoreSwitch setMealType={setMealType} />}
      {/* {mealData && <p>선택한 식사: {mealData}</p>} */}
    </Wrapper>
  );
}

export default CalendarList;
