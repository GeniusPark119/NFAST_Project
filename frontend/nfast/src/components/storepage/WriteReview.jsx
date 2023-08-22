import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import NFastCard from "../commons/NFastCard";
import reviewTimer from "../../assets/Review_timer.png";
// import reviewParking from "../../assets/Review_parking.png";
// import reviewKind from "../../assets/Review_kind.png";
// import reviewVeiw from "../../assets/Review_view.png";
import { storeAction } from "../../redux/actions/storeAction";
import { getSequence } from "../../storage/Cookie";

const Styledh2 = styled.div`
  text-align: center;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    margin-top: 60px;
    margin-bottom: 30px;
  }
  p {
    font-size: 16px;
    margin-top: 30px;
  }
`;
const StyleBtn = styled.div`
  margin: 5%;
  display: flex;
  justify-content: center;
  Button {
    width: 100px;
    height: 40px;
    background-color: #bcb6ff;
    color: white;
    font-size: 15px;
  }
`;
export default function WriteReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nfastSequence } = useParams();
  const [inputs, setInputs] = useState({
    nfastSequence,
    userSequence: getSequence(),
    reviews: {
      reviewTime: [],
      reviewConvenience: [],
      reviewService: [],
      reviewMood: [],
    },
  });
  const handleSubmit = () => {
    if (
      inputs.reviews.reviewTime === null ||
      inputs.reviews.reviewConvenience === null ||
      inputs.reviews.reviewService === null ||
      inputs.reviews.reviewMood === null
    ) {
      // eslint-disable-next-line no-alert
      alert("리뷰 작성을 완료해주세요");
    } else {
      // eslint-disable-next-line no-console
      console.log("나야나", nfastSequence);
      dispatch(
        storeAction.writeReview(nfastSequence, getSequence(), inputs.reviews)
      );
      // eslint-disable-next-line no-alert
      alert("리뷰작성이 완료되었습니다.");
      navigate("/mainpage");
    }
  };
  const handleTime = (event) => {
    const selectedValue = event.target.value;
    setInputs(() => ({
      // ...prevInputs,
      reviews: {
        // ...prevInputs.reviews,
        reviewTime: [selectedValue],
      },
    }));
  };
  const handleConvenience = (event) => {
    const selectedValue = event.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      reviews: {
        ...prevInputs.reviews,
        reviewConvenience: [selectedValue],
      },
    }));
  };
  const handleService = (event) => {
    const selectedValue = event.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      reviews: {
        ...prevInputs.reviews,
        reviewService: [selectedValue],
      },
    }));
  };
  const handleMood = (event) => {
    const selectedValue = event.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      reviews: {
        ...prevInputs.reviews,
        reviewMood: [selectedValue],
      },
    }));
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <NFastCard> </NFastCard>
      <Styledh2>
        <h4>리뷰를 선택해주세요.</h4>
      </Styledh2>
      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            m: 1,
            width: 200,
            height: 200,
            borderColor: "divider",
          },
          justifyContent: "center",
        }}
      >
        <Paper
          variant="outlined"
          style={{ border: "2px solid #B8B6F5", borderRadius: "16px" }}
        >
          <FormControl sx={{ padding: "13px" }}>
            <FormLabel
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            >
              <img src={reviewTimer} alt="d" />
              시간
            </FormLabel>
            <RadioGroup onChange={handleTime}>
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="바로 들어갔어요."
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="10분 내로 들어갔어요."
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="20분 내로 들어갔어요."
              />
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper
          variant="outlined"
          style={{
            border: "2px solid #B8B6F5",
            borderRadius: "16px",
            marginBottom: 1,
          }}
        >
          <FormControl sx={{ padding: "13px" }}>
            <FormLabel sx={{ display: "flex", alignItems: "center" }}>
              <img src={reviewTimer} alt="d" />
              편의시설
            </FormLabel>
            <RadioGroup onChange={handleConvenience}>
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="주차하기 편해요."
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="좌석이 편안해요."
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="교통이 편리해요."
              />
            </RadioGroup>
          </FormControl>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          "& > :not(style)": {
            m: 1,
            width: 200,
            height: 200,
            borderColor: "divider",
          },
          justifyContent: "center",
        }}
      >
        <Paper
          variant="outlined"
          style={{ border: "2px solid #B8B6F5", borderRadius: "16px" }}
        >
          <FormControl sx={{ padding: "13px" }}>
            <FormLabel
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            >
              <img src={reviewTimer} alt="d" />
              서비스
            </FormLabel>
            <RadioGroup onChange={handleService}>
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="친절해요."
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="응대가 빨라요."
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="매장이 청결해요."
              />
            </RadioGroup>
          </FormControl>
        </Paper>
        <Paper
          variant="outlined"
          style={{ border: "2px solid #B8B6F5", borderRadius: "16px" }}
        >
          <FormControl sx={{ padding: "13px" }}>
            <FormLabel
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            >
              <img src={reviewTimer} alt="d" />
              <span style={{ marginLeft: 5 }}>분위기</span>
            </FormLabel>
            <RadioGroup onChange={handleMood}>
              <FormControlLabel
                value="0"
                control={<Radio />}
                label="뷰가 좋아요."
                sx={{ fontSize: "14px", lineHeight: 1 }}
              />
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="인테리어가 좋아요."
                sx={{ fontSize: "14px", lineHeight: 1 }}
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="사진이 잘 나와요."
              />
            </RadioGroup>
          </FormControl>
        </Paper>
      </Box>
      <StyleBtn>
        <Button variant="contained" onClick={handleSubmit}>
          리뷰 등록
        </Button>
      </StyleBtn>
    </div>
  );
}
