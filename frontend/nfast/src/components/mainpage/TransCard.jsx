import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
// import StorefrontIcon from "@mui/icons-material/Storefront";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
// import { mainAction } from "../../redux/actions/mainAction";

const positionAnimation = keyframes`

from {
transform : translate(0px , 40px)
}
to {
  transform : translate(0)
}

`;
const Cards = styled.div`
  animation: ${positionAnimation} 1s ease-out;
`;
export default function TransCard(props) {
  // eslint-disable-next-line react/prop-types
  const { transList } = props;
  TransCard.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types, no-undef
    transList: PropTypes.array.isRequired,
  };

  return (
    <Cards style={{ marginTop: 30 }}>
      <Grid container spacing={3}>
        {transList.slice(0, 4).map((card, index) => (
          <Grid
            // eslint-disable-next-line react/no-array-index-key
            key={index}
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
                  <LocationOnIcon style={{ color: "orange", fontSize: 14 }} />
                  {card.storeAddress}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Cards>
  );
}
