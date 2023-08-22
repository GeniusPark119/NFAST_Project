/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { TextField, InputAdornment, IconButton } from "@mui/material";
// import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { searchAction } from "../../redux/actions/searchAction";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.searchReducer.searchList);
  console.log(`${searchList}`);
  // 가게 이름 배열 wholeTextArray
  const wholeTextArray = [];
  searchList.map((store) => wholeTextArray.push(store.storeName));
  console.log(wholeTextArray);
  useEffect(() => {
    dispatch(searchAction.getSearchList());
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState(wholeTextArray);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);

  const navigate = useNavigate();

  let StoreSequence = 0;
  const getStoreSequence = (clickedItem) => {
    const store = searchList.find((store) => store.storeName === clickedItem);
    if (store) {
      StoreSequence = store.storeSequence;
      navigate(`/store/${StoreSequence}`);
    }
  };

  const showDropDownList = () => {
    if (inputValue === "") {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      const choosenTextList = wholeTextArray.filter((textItem) =>
        textItem.includes(inputValue)
      );
      setDropDownList(choosenTextList);
    }
  };

  const changeInputValue = (event) => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
  };

  const clickDropDownItem = (clickedItem) => {
    setInputValue(clickedItem);
    console.log(clickedItem);
    getStoreSequence(clickedItem);
    setIsHaveInputValue(false);
  };

  const handleDropDownKey = (event) => {
    // input에 값이 있을때만 작동
    if (isHaveInputValue) {
      if (
        event.key === "ArrowDown" &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === "ArrowUp" && dropDownItemIndex >= 0)
        setDropDownItemIndex(dropDownItemIndex - 1);
      if (event.key === "Enter" && dropDownItemIndex >= 0) {
        clickDropDownItem(dropDownList[dropDownItemIndex]);
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(showDropDownList, [inputValue]);

  // const [IsClicked, setIsClicked] = useState(false);

  // const handleFocus = () => {
  //   setIsClicked(true);
  // };

  // const handleBlur = () => {
  //   setIsClicked(false);
  // };

  return (
    <WholeBox>
      <InputBox isHaveInputValue={isHaveInputValue}>
        <Input
          type="text"
          value={inputValue}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
          placeholder="맛집을 검색하세요"
        />
        <DeleteButton onClick={() => setInputValue("")}>&times;</DeleteButton>
      </InputBox>
      {isHaveInputValue && (
        <DropDownBox>
          {dropDownList.length === 0 && (
            <DropDownItem>해당하는 단어가 없습니다</DropDownItem>
          )}
          {dropDownList.map((dropDownItem, dropDownIndex) => {
            return (
              <DropDownItem
                // eslint-disable-next-line react/no-array-index-key
                key={dropDownIndex}
                onClick={() => clickDropDownItem(dropDownItem)}
                onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                className={
                  dropDownItemIndex === dropDownIndex ? "selected" : ""
                }
              >
                {dropDownItem}
              </DropDownItem>
            );
          })}
        </DropDownBox>
      )}
    </WholeBox>
  );
}
const activeBorderRadius = "16px 16px 0 0";
const inactiveBorderRadius = "16px 16px 16px 16px";

const WholeBox = styled.div`
  width: 180px;
  padding: 5px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border: 1px solid #bcb6ff;
  border-radius: ${(props) =>
    props.isHaveInputValue ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;

  &:focus-within {
    box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  }
`;

const Input = styled.input`
  width: 100%;
  flex: 1 0 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  color: black;
  border: none;
  outline: none;
  color: #6c509f;
  font-size: 14px;
`;

const DeleteButton = styled.div`
  color: #bcb6ff;
  cursor: pointer;
`;

const DropDownBox = styled.ul`
  color: #6c509f;
  display: block;
  margin: 0 auto;
  padding: 8px 0;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
  list-style-type: none;
  z-index: 3;
  position: absolute; /* set a fixed position */
  top: 60px; /* adjust the top position as needed */
  width: 178px;
`;

const DropDownItem = styled.li`
  font-size: 15px;
  padding: 12px 7px;

  &.selected {
    background-color: lightgray;
  }
`;
