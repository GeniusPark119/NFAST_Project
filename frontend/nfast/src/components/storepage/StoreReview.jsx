/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";
import Chip from "@mui/material/Chip";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DoneIcon from "@mui/icons-material/Done";
import reviewTimer from "../../assets/Review_timer.png";
// import reviewParking from "../../assets/Review_parking.png";
// import reviewKind from "../../assets/Review_kind.png";
// import reviewVeiw from "../../assets/Review_view.png";

function StoreReview(props) {
  // eslint-disable-next-line react/prop-types
  const { review } = props;
  // eslint-disable-next-line
  console.log("내가리뷰야", review);

  return (
    <Chips>
      <h4>
        <PersonOutlineIcon />
        방문자 리뷰
      </h4>
      <AlignChip>
        <Wrapper>
          <StyledChip
            label={`${
              review.reviewTime
                ? review.reviewTime[0]
                : "등록된 리뷰가 없습니다."
            } ${review.reviewTime ? review.reviewTime[1] : ""}`}
            deleteIcon={<DoneIcon />}
            variant="outlined"
            avatar={<img src={reviewTimer} alt="d" />}
          />
        </Wrapper>
        <Wrapper>
          <StyledChip
            label={`${
              review.reviewConvenience
                ? review.reviewConvenience[0]
                : "등록된 리뷰가 없습니다."
            } ${review.reviewConvenience ? review.reviewConvenience[1] : ""}`}
            deleteIcon={<DoneIcon />}
            variant="outlined"
            avatar={<img src={reviewTimer} alt="d" />}
          />
        </Wrapper>
      </AlignChip>
      <AlignChip>
        <Wrapper>
          <StyledChip
            label={`${
              review.reviewService
                ? review.reviewService[0]
                : "등록된 리뷰가 없습니다."
            } ${review.reviewService ? review.reviewService[1] : ""}`}
            // label={`${review.reviewService[0]} ${review.reviewService[1]}`}
            deleteIcon={<DoneIcon />}
            variant="outlined"
            avatar={<img src={reviewTimer} alt="d" />}
          />
        </Wrapper>
        <Wrapper>
          <StyledChip
            label={`${
              review.reviewMood
                ? review.reviewMood[0]
                : "등록된 리뷰가 없습니다."
            } ${review.reviewMood ? review.reviewMood[1] : ""}`}
            deleteIcon={<DoneIcon />}
            variant="outlined"
            avatar={<img src={reviewTimer} alt="d" />}
          />
        </Wrapper>
      </AlignChip>
    </Chips>
  );
}

export default StoreReview;
const Chips = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  h4 {
    margin-left: 3%;
    display: flex;
    align-items: center;
  }
`;

const AlignChip = styled.div`
  width: 95%;
  margin: 5px;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  margin: 0px 3px;
`;

const StyledChip = styled(Chip)`
  width: 180px;
  .MuiChip-label {
    font-size: 11px;
  }
`;
