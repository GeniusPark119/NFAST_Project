/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MyField from "./MyField";
// import SwitchTime from "./SwitchTime";
import { web3 } from "../../axios/web3";
import ipfs from "../../axios/ipfs";

const Publish = styled.div`
  // height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UploadPhoto = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border: solid 1px #bcb6ff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    color: #5b5299;
  }
`;
const Form = styled.form`
  height: 60%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;

  h4 {
    width: 40%;
    margin-right: 20px;
  }
`;
const FileBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const FileInput = styled.input`
  &::file-selector-button {
    display: none;
  }
`;
const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
`;

const Time = styled(Date)`
  width: 100%;
`;

const Count = styled(Date)``;

const Price = styled(Count)``;

const jsonSubmit = async (data) => {
  const accounts = await web3.eth.getAccounts();
  // const ethAddress = await storehash.options.address; CA주소
  console.log(accounts[0]);
  const file = {
    path: "/tmp/myfile.txt",
    content: JSON.stringify(data),
  };
  const testc = await ipfs.add(file);
  console.log(testc.cid.string);
  return { cid: testc.cid.string, walletAddress: accounts[0] };
  // setInput({
  //   external_url: testc.cid.string,
  //   image: accounts[0],
  // });
};

export default function SellerPublish() {
  const [picture, setPicture] = useState(null); // state for storing selected picture

  const handlePictureChange = (e) => {
    // handler for updating state when picture is selected
    const file = e.target.files[0];
    setPicture(file);
  };

  const handleRegist = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    console.log(e.target[2].checked);
    const data = {
      date: e.target[0].value,
      time: e.target[2].checked === false ? 0 : 1,
      start: e.target[3].value,
      end: e.target[5].value,
      count: e.target[7].value,
      price: e.target[9].value,
      cid: "",
      walletAddress: "",
      storeName: "",
    };
    // rest api
    // data.storeName = 가게이름
    console.log(e.target[2]);
    console.log(e.target[2].value);
    const tempData = await jsonSubmit(data);
    data.cid = tempData.cid;
    data.walletAddress = tempData.walletAddress;
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div>
      <Publish>
        <UploadPhoto>
          {!picture && <span>사진 등록하기</span>}
          {picture && ( // display picture if it is selected
            <img
              src={URL.createObjectURL(picture)}
              alt="Selected"
              style={{ width: "100%", objectFit: "cover", marginBottom: 10 }}
            />
          )}
        </UploadPhoto>
        <Form onSubmit={handleRegist}>
          <FileBox>
            <FileInput // file input field for selecting picture
              type="file"
              accept="image/*"
              id="photo"
              onChange={handlePictureChange}
              style={{ marginBottom: 10, display: "none" }}
            />
            <label htmlFor="photo">
              <AddCircleIcon sx={{ fontSize: "60px", color: "#BCB6FF" }} />
            </label>
          </FileBox>
          <Date>
            <h4>지갑 주소</h4>
            <MyField content="count" variant="outlined" />
          </Date>
          <Count>
            <h4>가게 이름</h4>
            <MyField content="count" variant="outlined" />
          </Count>
          <Time>
            <h4>런치</h4>
            <MyField content="time" variant="outlined" />
            <MyField content="time" variant="outlined" />
          </Time>
          <div style={{ marginLeft: 30 }} />
          <Time>
            <h4>디너</h4>
            <MyField content="time" variant="outlined" />
            <MyField content="time" variant="outlined" />
          </Time>
          <Count>
            <h4>전화 번호</h4>
            <MyField content="count" variant="outlined" />
          </Count>
          <Price>
            <h4>가게 소개</h4>
            <MyField content="price" variant="outlined" />
          </Price>
          <Price>
            <h4>이용 방법</h4>
            <MyField content="price" variant="outlined" />
          </Price>
          <ButtonBox>
            <Button
              sx={{ backgroundColor: "#BCB6FF", margin: 5 }}
              type="submit"
              variant="contained"
              disableElevation
            >
              수정하기
            </Button>
          </ButtonBox>
        </Form>
      </Publish>
    </div>
  );
}
