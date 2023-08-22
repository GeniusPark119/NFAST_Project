import React, { useState } from "react";
import styled from "styled-components";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";

import { Typography } from "@mui/material";
import Metamask from "../loginpage/Metamask";
import storeDefault from "../../assets/storeDefault.png";
// import logo from "../../assets/logo.png";

const StyleBtn = styled.div`
  Button {
    width: 120px;
    height: 50px;
    background-color: #bcb6ff;
    color: white;
    font-size: 13px;
  }
`;

export default function Register() {
  const [inputs, setInputs] = useState({
    storeInfoNumber: null,
    storeAddress: "",
    storeImage: storeDefault,
  });
  const onChangeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
    // eslint-disable-next-line no-console
    console.log(nextInputs);
  };

  const getPostcode = () => {
    new window.daum.Postcode({
      oncomplete(data) {
        let addr = ""; // 주소 변수
        let extraAddr = ""; // 참고항목 변수

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? `,  ${data.buildingName}` : data.buildingName;
          }
          if (extraAddr !== "") {
            extraAddr = ` (  ${extraAddr}  )`;
          }
          document.getElementById("address").value = extraAddr;
        } else {
          document.getElementById("address").value = "";
        }

        document.getElementById("zonecode").value = data.zonecode;
        document.getElementById("address").value = addr;
        const nextInput = {
          ...inputs,
          storeAddress: addr,
        };
        setInputs(nextInput);
      },
    }).open();
  };

  // useEffect(()=>{
  //   console.log("어쩌구");
  //   // 입력된 주소 storeAddress에 저장
  // }, storeAddress)
  return (
    <ProfilBox>
      <ContentBox>
        <Box
          sx={{
            gap: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& .MuiTextField-root": {
              width: "100%",
            },
          }}
        >
          <Typography
            sx={{ display: "flex", justifyContent: "flex-start", marginTop: 3 }}
          >
            사업자 등록 번호
          </Typography>
          <TextField
            id="filled-read-only-input"
            name="storeInfoNumber"
            placeholder="사업자 등록 번호를 입력하세요."
            fullWidth
            onChange={onChangeHandler}
            value={inputs.storeInfoNumber}
          />
          <Typography
            sx={{ display: "flex", justifyContent: "flex-start", marginTop: 3 }}
          >
            주소 입력
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <TextField
              id="zonecode"
              placeholder="ex) 강서로 348"
              variant="outlined"
            />
            <StyleBtn>
              <Button variant="contained" onClick={getPostcode}>
                주소 검색
              </Button>
            </StyleBtn>
          </div>
          <TextField
            id="address"
            name="storeAddress"
            placeholder="상세 주소를 입력하세요."
            variant="outlined"
          />
          <div style={{ marginTop: 20 }}> </div>
          <Metamask isSeller={2} store={inputs} />
        </Box>
      </ContentBox>
    </ProfilBox>
  );
}

const ProfilBox = styled.div`
  // height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 10%;
  position: relative; /* contact box 고정시키기위해서 */
`;
const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 682px) {
    height: 70%;
  }
`;
