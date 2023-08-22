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

export default function IncomeTable({ incomeList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const Pag = styled.div`
    margin: 10%;
    display: flex;
    justify-content: center;
  `;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Table sx={{ textAlign: "center" }}>
        <TableHead align="center">
          <TableRow>
            <TableCell sx={{ width: "30%" }}>유효 날짜</TableCell>
            <TableCell sx={{ width: "30%" }}>수수료 수익</TableCell>
          </TableRow>
        </TableHead>
        <TableBody align="center">
          {incomeList.slice(startIndex, endIndex).map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              <TableCell>
                {`${new Date(item.incomeListDate).getFullYear()}.
                ${new Date(item.incomeListDate).getMonth()}.
                ${new Date(item.incomeListDate).getDate()}`}
              </TableCell>
              <TableCell>{item.incomeListPrice}Eth</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pag>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(incomeList.length / itemsPerPage)}
            page={currentPage}
            variant="outlined"
            color="secondary"
            onChange={handlePageChange}
          />
        </Stack>
      </Pag>
    </div>
  );
}

IncomeTable.propTypes = {
  incomeList: PropTypes.arrayOf(
    PropTypes.shape({
      incomeListDate: PropTypes.string,
      incomeListPrice: PropTypes.number,
      incomeListTransaction: PropTypes.string,
      incomeListType: PropTypes.number,
    })
  ).isRequired,
};
