/* eslint-disable no-console */
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { mypageAction } from "../../redux/actions/mypageAction";

const Styledh2 = styled.div`
  text-align: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    margin-top: 40px;
    margin-bottom: 50px;
  }
  p {
    font-size: 16px;
    margin-top: 30px;
  }
`;

const StyleBtn = styled.div`
  margin: 17%;

  Button {
    width: 90px;
    height: 50px;
    background-color: #bcb6ff;
    color: white;
    font-size: 18px;
  }
`;

function MyInfo(props) {
  const { userSequence, userWallet, userNickname, userImage } = props;
  console.log("userWallet", userWallet);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [picture, setPicture] = useState([]);
  const [inputs, setInputs] = useState({
    userSequence,
    userWallet,
    userNickname,
  });

  useEffect(() => {
    setInputs({
      userSequence,
      userWallet,
      userNickname,
    });
    setImage(userImage);
  }, [props]);

  const fileInput = useRef(null);

  const onDrop = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setPicture(e.target.files[0]);
    } else {
      setImage(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      );
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const modifyUserInfo = () => {
    console.log("INPUTS", inputs);
    const params = new FormData();
    const json = JSON.stringify(inputs);
    const blob = new Blob([json], { type: "application/json" });
    params.append("user", blob);
    params.append("userImage", picture);
    dispatch(mypageAction.modifyUserInfo(userSequence, params));
    navigate(`/mainpage`);
  };
  console.log(userImage);
  console.log(image);
  const onChangeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
  };
  return (
    <div>
      <Styledh2>
        <h4>정보 수정</h4>
        <IconButton sx={{ width: 200, height: 200 }}>
          <Avatar
            alt="Remy Sharp"
            src={image}
            sx={{ width: 200, height: 200 }}
            onClick={() => {
              fileInput.current.click();
            }}
            value={image}
          />
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            id="profile_img"
            onChange={onDrop}
            ref={fileInput}
          />
        </IconButton>
        <label
          htmlFor="profile_img"
          style={{
            margin: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          프로필 편집 <EditIcon sx={{ marginLeft: 1 }} />
        </label>
        <Box
          sx={{
            width: "70%",
          }}
        >
          <p style={{ textAlign: "left", fontSize: "medium" }}>연동지갑 주소</p>
          <TextField
            id="filled-read-only-input"
            name="userWallet"
            value={userWallet}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <p style={{ textAlign: "left", fontSize: "medium" }}>닉네임 변경</p>
          <TextField
            id="outlined-basic"
            label="변경할 닉네임을 입력하세요."
            variant="outlined"
            fullWidth
            name="userNickname"
            onChange={onChangeHandler}
          />
          <StyleBtn>
            <Button variant="contained" onClick={modifyUserInfo}>
              수정
            </Button>
          </StyleBtn>
        </Box>
      </Styledh2>
    </div>
  );
}

MyInfo.defaultProps = {
  userImage: "",
};

MyInfo.propTypes = {
  userWallet: PropTypes.string.isRequired,
  userNickname: PropTypes.string.isRequired,
  userImage: PropTypes.string,
  userSequence: PropTypes.number.isRequired,
};

export default MyInfo;
