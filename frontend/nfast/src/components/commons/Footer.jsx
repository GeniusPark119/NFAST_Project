import React from "react";
import { Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#C7C5EC",
        py: 3,

        borderTop: "1px solid #DDDCDC",
        width: "100%",
        height: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
        position: "relative",
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: "common.white",
          mb: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        © {new Date().getFullYear()} Copyright ⓒ
        <span style={{ marginLeft: "4px" }}> by A307 왕자공쥬들</span>
      </Typography>
      {/* <Typography
        variant="body2"
        align="center"
        sx={{
          color: "common.white",
          mb: 1,
          display: "flex",
          alignItems: "center",
        }}
      >
        all rights reserved.{" | "}
        <span style={{ marginLeft: "4px" }}>Terms of Service</span>
      </Typography> */}
    </Box>
  );
}
