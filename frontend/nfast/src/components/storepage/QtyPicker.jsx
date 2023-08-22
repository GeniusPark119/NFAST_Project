/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../redux/actions/storeAction";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Picker = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #7b6ffc;
  button {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    border: solid 1px #bcb6ff;
    background-color: white;
    font-size: 20px;
    color: #bcb6ff;
    margin: 20px;
  }
`;
const Price = styled.h3`
  margin-right: 20px;
`;

function QtyPicker() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [list, setList] = useState([]);
  const totalCnt = useSelector((state) => state.storepageReducer.totalCnt);
  const purchaseList = useSelector(
    (state) => state.storepageReducer.purchaseList
  );
  console.log(purchaseList);
  useEffect(() => {
    const temp = [];
    let cnt = 0;
    purchaseList.map((item) => {
      for (let i = 0; i < item.amount; i += 1) {
        temp[cnt] = item.nfastHopePrice;
        cnt += 1;
      }
      return temp;
    });
    setList(temp);
  }, [purchaseList]);

  useEffect(() => {
    dispatch(storeAction.saveAmount(count));
  }, [count]);

  const handleIncrement = () => {
    if (count >= totalCnt) {
      alert("구매 가능 개수를 초과하셨습니다.");
    } else {
      setPrice(price + list[count]);
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setPrice(price - list[count - 1]);
    }
  };

  return (
    <Wrapper>
      <Picker>
        <button type="submit" onClick={handleDecrement}>
          -
        </button>
        <span>{count}</span>
        <button type="submit" onClick={handleIncrement}>
          +
        </button>
      </Picker>
      <Price>{price}원</Price>
    </Wrapper>
  );
}

export default QtyPicker;
