import * as React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
// import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
// import DoneIcon from "@mui/icons-material/Done";
import RoomIcon from "@mui/icons-material/Room";
import reviewTimer from "../../assets/Review_timer.png";
import reviewParking from "../../assets/Review_parking.png";
import reviewKind from "../../assets/Review_kind.png";
import reviewVeiw from "../../assets/Review_view.png";

function MyNftCard2() {
  const NFT2 = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  `;
  const StyledChip = styled(Chip)`
    margin: 30px;
    padding: 10px;
    width: 100px;
  `;
  const ReviewChip = styled(Chip)`
    margin: 5;
    padding: 10px;
    width: 140px;
  `;
  const Chips = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
  `;
  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log("You clicked the Chip.");
  };
  return (
    <div>
      <NFT2>
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
            borderRadius: 7,
            backgroundColor: "#DEDDFF",
            border: "solid 3px #ABA1A1",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                2023.03.13
              </Typography>
              <Typography component="div" variant="h5">
                연돈
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", pl: 1, pb: 1 }}>
              <StyledChip
                style={{ backgroundColor: "white" }}
                icon={<RoomIcon />}
                label="재방문"
                onClick={handleClick}
                //   deleteIcon={<DoneIcon />}
                variant="outlined"
              />
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                style={{ paddingLeft: 8 }}
              >
                30.143 Eth
              </Typography>
            </Box>
          </Box>
          <Chips>
            <ReviewChip
              style={{ margin: 2, backgroundColor: "white" }}
              label="바로 들어갔어요"
              onClick={handleClick}
              variant="outlined"
              avatar={<img src={reviewTimer} alt="d" />}
            />
            <ReviewChip
              style={{ margin: 2, backgroundColor: "white" }}
              label="주차하기 편해요"
              onClick={handleClick}
              variant="outlined"
              avatar={<img src={reviewParking} alt="d" />}
            />
            <ReviewChip
              style={{ margin: 2, backgroundColor: "white" }}
              label="친절해요"
              onClick={handleClick}
              variant="outlined"
              avatar={<img src={reviewKind} alt="d" />}
            />
            <ReviewChip
              style={{ margin: 2, backgroundColor: "white" }}
              label="뷰가 좋아요"
              onClick={handleClick}
              variant="outlined"
              avatar={<img src={reviewVeiw} alt="d" />}
            />
          </Chips>
        </Card>
      </NFT2>
    </div>
  );
}
export default MyNftCard2;
