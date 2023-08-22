/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";
import { authAction } from "../../redux/actions/authAction";
import { mypageAction } from "../../redux/actions/mypageAction";
import { getSequence } from "../../storage/Cookie";

export default function Sidebar() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const userInfo = useSelector((state) => state.mypageReducer.userInfo);
  useEffect(() => {
    dispatch(mypageAction.getUserInfo(getSequence()));
    console.log("이미지내놔 ", userInfo.userImage);
  }, []);

  useEffect(() => {
    dispatch(mypageAction.getUserInfo(getSequence()));
  }, [getSequence]);
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = (type) => {
    console.log("TYPEEEEEEEEE", type);
    setOpenDrawer(false);
    // if (type) {
    //   navigate(type);
    // }
  };

  const logout = () => {
    dispatch(authAction.onLogout());
  };

  console.log("USER", userInfo);
  return (
    userInfo && (
      <div>
        <div>
          <Tooltip>
            <IconButton onClick={handleDrawerOpen} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={userInfo.userImage} />
            </IconButton>
          </Tooltip>
          <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
            <Box sx={{ width: 300, height: "100%" }} role="presentation">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "30px",
                  padding: "16px",
                  height: "20%",
                  backgroundColor: "#EAEAED",
                }}
              >
                <Avatar
                  alt="Profile picture"
                  src={userInfo.userImage}
                  sx={{ width: "80px", height: "80px" }}
                />
                <Typography fontSize={15}>
                  <span style={{ color: "purple" }}>
                    {userInfo.userNickname}
                  </span>
                  님, 환영합니다.
                </Typography>
              </Box>
              <Divider />
              <List>
                <ListItem disablePadding sx={{ height: "50px" }}>
                  <ListItemButton href="/mynft">
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText sx={{ fontSize: "50px" }}>
                      나의 NFT
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ height: "50px" }}>
                  <ListItemButton href="/mytrans">
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText>NFT 거래내역</ListItemText>
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ height: "50px" }}>
                  <ListItemButton href="/mybookmark">
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText>나의 북마크</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ height: "50px" }}>
                  <ListItemButton href="/myinfo">
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText>나의 정보수정</ListItemText>
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ height: "50px" }}
                  onClick={() => logout()}
                >
                  <ListItemButton href="/loginCustomer">
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText>로그아웃</ListItemText>
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "5px",
                  padding: "10px",
                  height: "60%",
                  backgroundColor: "#EAEAED",
                }}
              >
                <Typography fontSize={12}>Copyright ⓒ 2023</Typography>
                <Typography fontSize={12}>
                  by A307 왕자공쥬들 all rights reserved.
                </Typography>
                {/* <Typography fontSize={12}></Typography> */}
              </Box>
            </Box>
          </Drawer>
        </div>
      </div>
    )
  );
}
