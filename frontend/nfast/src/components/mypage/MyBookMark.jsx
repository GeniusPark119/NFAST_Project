import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

// import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { getSequence } from "../../storage/Cookie";
import { mypageAction } from "../../redux/actions/mypageAction";

export default function MyBookMark() {
  const Styled = styled.div`
    text-align: center;
    h4 {
      margin-top: 50px;
      margin-bottom: 70px;
    }
  `;
  const Pag = styled.div`
    margin: 10%;
    display: flex; /* 가로 정렬을 위해 flexbox 설정 */
    justify-content: center; /* 가운데 정렬 */
  `;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mypageAction.getBookMarkList(getSequence()));
  }, []);
  const bookmarkList = useSelector((state) => state.mypageReducer.bookmarkList);

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const cardsPerPage = 4;
  const getCardList = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    return bookmarkList.slice(startIndex, endIndex);
  };

  return (
    <div>
      <Styled>
        <h4>나의 북마크</h4>

        <div style={{ marginTop: 30 }}>
          {bookmarkList.length > 0 ? (
            <Grid container spacing={3}>
              {getCardList().map((card) => (
                <Grid
                  item
                  xs={6}
                  sm={6} // change to 6 for Galaxy S20 Ultra
                  md={6} // change to 6 for Galaxy S20 Ultra
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
                    <CardContent style={{}}>
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
                        <LocationOnIcon
                          style={{ color: "orange", fontSize: 14 }}
                        />
                        {card.storeAddress}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <span>북마크 리스트가 존재하지 않습니다.</span>
          )}
        </div>
        <Pag>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(bookmarkList.length / cardsPerPage)}
              variant="outlined"
              color="secondary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Pag>
      </Styled>
    </div>
  );
}
