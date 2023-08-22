import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { storeAction } from "../../redux/actions/storeAction";

export default function BasicTable() {
  const dispatch = useDispatch();
  const [totalCnt, setTotalCnt] = useState(0);
  const rows = useSelector((state) => state.storepageReducer.purchaseList);

  useEffect(() => {
    let sum = 0;
    rows.map((item) => {
      sum += item.amount;
      return sum;
    });
    setTotalCnt(sum);
  }, [rows]);

  useEffect(() => {
    console.log(totalCnt);
    dispatch(storeAction.saveTotalCnt(totalCnt));
  }, [totalCnt]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>변동</TableCell>
            <TableCell align="right">수량</TableCell>
            <TableCell align="right">가격&nbsp;(eth)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            return (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  console.log(index);
                }}
              >
                <TableCell component="th" scope="row">
                  {row.nfastDate}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">
                  {row.nfastHopePrice}&nbsp;(eth)
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
