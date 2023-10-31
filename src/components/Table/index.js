import { Box, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";

import StyledTableCell from "./StyledTableCell";
const CustomPagination = dynamic(() => import("./Pagination"), { ssr: false });

const CustomTable = ({
  onSelectItem,
  selectedItems,
  onSelectAll,
  data,
  header,
  numbering,
  isAction,
  actions,
  checkbox,
  page,
  handleChangePage,
}) => {
  // Rendering cell page by key on header
  const renderCell = (row, item) => {
    if (item?.child) {
      if (item?.render) {
        return item.render(
          row[item.key]
            ? row[item.key][item.child] !== ""
              ? row[item.key][item.child]
              : "-"
            : "-" || "-"
        );
      }
      return row[item.key]
        ? row[item.key][item.child] !== ""
          ? row[item.key][item.child]
          : "-"
        : "-" || "-";
    } else if (item?.render) {
      return item.render(row[item.key], row);
    } else {
      return row[item.key] || "-";
    }
  };

  return (
    <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12} style={{ width: "100%" }}>
        <TableContainer
          component={Paper}
          style={{ maxWidth: "100%", width: "100%", overflowX: "auto" }}
        >
          <Table aria-label="simple table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ border: "1px solid #E0E0E0" }}>
                {checkbox !== "hidden" && (
                  <StyledTableCell style={{ position: "sticky", left: "0" }}>
                    <Checkbox
                      style={{ width: "18px", height: "18px" }}
                      name="select-all"
                      id="all"
                      checked={selectedItems?.length === data?.length}
                      onChange={onSelectAll}
                    />
                  </StyledTableCell>
                )}
                {numbering && <StyledTableCell>No</StyledTableCell>}
                {header?.map((item) => (
                  <StyledTableCell key={item.title}>
                    <Box width={item?.width || "auto"}>{item.title}</Box>
                  </StyledTableCell>
                ))}
                {isAction && <StyledTableCell>Aksi</StyledTableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.length ? (
                data?.slice(page * 5 - 5, page * 5)?.map((row, index) => (
                  <TableRow key={index} sx={{ border: "1px solid #E0E0E0" }}>
                    {checkbox !== "hidden" && (
                      <TableCell
                        style={{
                          position: "sticky",
                          left: "0",
                          background: "white !important",
                          zIndex: 100,
                        }}
                      >
                        <Checkbox
                          style={{ width: "18px", height: "18px" }}
                          name={`checkbox-${row.id}`}
                          checked={selectedItems?.includes(row.id)}
                          id={`checkbox-${row.id}`}
                          onChange={() => onSelectItem(row.id)}
                        />
                      </TableCell>
                    )}
                    {numbering && (
                      <TableCell align="left">{index + 1}</TableCell>
                    )}

                    {header?.map((item) => (
                      <TableCell align="left" key={item.key}>
                        {renderCell(row, item)}
                      </TableCell>
                    ))}
                    {isAction && (
                      <TableCell align="left">{actions(row)}</TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={header?.length + 3}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Box sx={{ paddingY: "2rem", fontWeight: "bold" }}>
                      Tidak ada data
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        container
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <CustomPagination
          page={page}
          count={2}
          handleChangePage={(e, value) => handleChangePage(e, value, "page")}
        />
      </Grid>
    </Grid>
  );
};

export default CustomTable;
