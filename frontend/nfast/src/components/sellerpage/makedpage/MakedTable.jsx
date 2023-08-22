import React, { useState } from "react";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { toStringByFormatting } from "../../../api/transDate";

export default function MakedTable(props) {
  const { publishNfasts } = props;

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const Pag = styled.div`
    margin: 10%;
    display: flex;
    justify-content: center;
  `;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Table sx={{ textAlign: "center" }}>
        <TableHead align="center">
          <TableRow>
            <TableCell sx={{ width: "40%" }}>날짜</TableCell>
            <TableCell sx={{ width: "25%" }}>발행 가격</TableCell>
            <TableCell sx={{ width: "30%" }}>판매/총 개수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody align="center">
          {publishNfasts.slice(startIndex, endIndex).map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                {toStringByFormatting(new Date(item.nfastDate))}
              </TableCell>
              <TableCell>{item.nfastDefaultPrice}Eth</TableCell>
              <TableCell>
                {item.nfastSaleCount}/{item.nfastTotalCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pag>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(publishNfasts.length / itemsPerPage)}
            page={page}
            variant="outlined"
            color="secondary"
            onChange={handleChangePage}
          />
        </Stack>
      </Pag>
    </div>
  );
}

MakedTable.propTypes = {
  publishNfasts: PropTypes.arrayOf(
    PropTypes.shape({
      nfastDate: PropTypes.string,
      nfastDefaultPrice: PropTypes.number,
      nfastSaleCount: PropTypes.number,
      nfastTotalCount: PropTypes.number,
    })
  ).isRequired,
};
