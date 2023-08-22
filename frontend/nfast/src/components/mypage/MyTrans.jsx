import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import styled from "styled-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { mypageAction } from "../../redux/actions/mypageAction";
import { getSequence } from "../../storage/Cookie";
import { toStringByFormatting } from "../../api/transDate";

const useStyles = makeStyles({
  arrowIcon: {
    color: "grey",
  },
});

// eslint-disable-next-line react/prop-types
function ArrowIcon({ direction }) {
  const classes = useStyles();

  return direction === "up" ? (
    <ArrowUpwardIcon className={classes.arrowIcon} />
  ) : (
    <ArrowDownwardIcon className={classes.arrowIcon} />
  );
}

export default function MyTrans() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(mypageAction.getTransactionList(getSequence()));
  }, []);

  const transactionList = useSelector(
    (state) => state.mypageReducer.transactionList
  );

  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const rowsPerPage = 6;
  const getTransList = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    if (transactionList.length === 0) {
      return transactionList;
    }
    return transactionList.slice(startIndex, endIndex);
  };

  return (
    <div>
      <Styledh2>
        <h4>거래 내역</h4>

        <Table sx={{ textAlign: "center" }}>
          <TableHead align="center">
            <TableRow>
              <TableCell sx={{ width: "20%" }}>가게명</TableCell>
              <TableCell sx={{ width: "5%" }}>
                <ArrowIcon direction="up" />
                <ArrowIcon direction="down" />
              </TableCell>
              <TableCell sx={{ width: "20%" }}>가격</TableCell>
              <TableCell sx={{ width: "20%" }}>유효 날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody align="center">
            {getTransList().length > 0 ? (
              getTransList().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.storeName}</TableCell>
                  <TableCell>{item.tradeListType === 0 ? "-" : "+"}</TableCell>
                  <TableCell>{item.tradeListPrice}Eth</TableCell>
                  <TableCell>
                    {toStringByFormatting(new Date(item.tradeListDate))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell> </TableCell>

                <TableCell colSpan={4}>
                  &nbsp;&nbsp;거래 내역이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pag>
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(transactionList.length / rowsPerPage)}
              variant="outlined"
              color="secondary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Pag>
      </Styledh2>
    </div>
  );
}
const Styledh2 = styled.div`
  text-align: center;
  margin-left: 5%;
  margin-right: 5%;
  h4 {
    margin-top: 50px;
    margin-bottom: 40px;
  }
`;
const Pag = styled.div`
  margin: 10%;
  display: flex; /* 가로 정렬을 위해 flexbox 설정 */
  justify-content: center; /* 가운데 정렬 */
`;
