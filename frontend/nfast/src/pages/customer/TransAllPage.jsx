import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RecordVoiceOverTwoToneIcon from "@mui/icons-material/RecordVoiceOverTwoTone";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { mainAction } from "../../redux/actions/mainAction";
import FloatingBtn from "../../components/commons/FloatingBtn";

// eslint-disable-next-line react/prop-types
export default function TransAllPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mainAction.getTrans());
  }, []);

  const transList = useSelector((state) => state.mainReducer.storesTrans);
  // eslint-disable-next-line
  console.log(transList);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const cardsPerPage = 4;
  const getCardList = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    return transList.slice(startIndex, endIndex);
  };

  // distanceList를 이용한 코드 구현
  return (
    transList && (
      <div>
        <Line>
          <Title>
            <RecordVoiceOverTwoToneIcon />
            <p>거래순 전체목록</p>
          </Title>
        </Line>
        <Grid container spacing={3}>
          {getCardList().map((card, index) => (
            <Grid
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              item
              xs={6}
              sm={3} // change to 6 for Galaxy S20 Ultra
              md={3} // change to 6 for Galaxy S20 Ultra
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Card
                sx={{
                  width: "100%",
                  height: "250px",
                }}
              >
                <Link to={`/store/${card.storeSequence}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.storeImage}
                    alt="random image"
                    sx={{
                      width: "100%",
                      height: "150px",
                    }}
                  />
                </Link>
                <CardContent>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{ fontSize: 15, marginBottom: 1 }}
                  >
                    {/* <StorefrontIcon style={{ color: "purple" }} /> */}
                    {card.storeName}
                  </Typography>

                  <Typography
                    gutterBottom
                    color="text.secondary"
                    style={{ fontSize: 11, display: "flex" }}
                  >
                    <LocationOnIcon style={{ color: "orange", fontSize: 14 }} />
                    {card.storeAddress}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pag>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(transList.length / cardsPerPage)}
              variant="outlined"
              color="secondary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Pag>
        <FloatingBtn>Floating</FloatingBtn>
      </div>
    )
  );
}

TransAllPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types, no-undef, react/no-unused-prop-types
  transList: PropTypes.array.isRequired,
};

const Line = styled.div`
  margin: 10%;
  text-align: center;
  p {
    font-size: 1.1rem;
  }
  span {
    font-size: 0.9rem;
  }
`;
// const Card = styled.div`
//   margin: 3%;
// `;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Pag = styled.div`
  margin: 10%;
  display: flex; /* 가로 정렬을 위해 flexbox 설정 */
  justify-content: center; /* 가운데 정렬 */
`;
