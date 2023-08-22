/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import CalendarList from "./CalendarList";
import { storeAction } from "../../redux/actions/storeAction";
import { getSequence } from "../../storage/Cookie";

export default function StoreNav() {
  const [value, setValue] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [bookmark, setBookmark] = useState("BookmarkBorderIcon");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { storeSequence } = useParams();
  const isBookMark = useSelector((state) => state.storepageReducer.bookmark);

  useEffect(() => {
    dispatch(storeAction.isBookMark(storeSequence, getSequence()));
    console.log("redux에서 어떻게 넘어오니 : ", isBookMark);
    if (isBookMark === 0) {
      setBookmark("BookmarkIcon");
    } else {
      setBookmark("BookmarkBorderIcon");
    }
  }, [isBookMark]);

  // Load bookmark state from session storage
  useEffect(() => {
    console.log("redux에서 어떻게 넘어오니 : ", isBookMark);
    console.log(bookmark);
  }, [bookmark]);
  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const toggleBookmark = () => {
    if (bookmark === "BookmarkIcon") {
      dispatch(storeAction.removeBookMark(storeSequence, getSequence()));
      // localStorage.setItem("storeBookmark", "BookmarkBorderIcon");
      setOpen(true);
      setBookmark("BookmarkBorderIcon");
    } else {
      dispatch(storeAction.addBookMark(storeSequence, getSequence()));
      // localStorage.setItem("storeBookmark", "BookmarkIcon");
      setOpen(true);
      setBookmark("BookmarkIcon");
    }
  };

  useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        setOpen(false);
      }, 600); // 3 seconds
    }
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <Box sx={{ maxWidth: "412px", position: "relative" }}>
      {showCalendar && <CalendarList />}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={
            bookmark === "BookmarkIcon" ? (
              <BookmarkIcon sx={{ color: "#5B5299" }} />
            ) : (
              <BookmarkBorderIcon sx={{ color: "#5B5299" }} />
            )
          }
          onClick={toggleBookmark}
        />
        <BottomNavigationAction
          label={showCalendar ? "돌아가기" : "구매하기"}
          onClick={toggleCalendar}
          sx={{
            color: "#5B5299",
            "&:hover": {
              color: "#5B5299",
            },
          }}
        />
      </BottomNavigation>
      <div
        style={{
          position: "fixed",
          top: 80,
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Slide
            in={open}
            direction="down"
            mountOnEnter
            unmountOnExit
            timeout={500}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "250px" }}
            >
              {bookmark === "BookmarkIcon"
                ? "북마크가 등록되었습니다."
                : "북마크가 해제되었습니다."}
            </Alert>
          </Slide>
        </Stack>
      </div>
    </Box>
  );
}
