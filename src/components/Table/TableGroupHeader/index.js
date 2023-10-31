import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox
} from '@mui/material';
import CellWithBorder from '../StyledTableCell/CellWithBorder';


const TableGroupHeader = ({
  onSelectItem,
  selectedItems,
  onSelectAll,
  data,
  header,
  numbering,
  isAction,
  actions
}) => {
  const renderCell = (row, item) => {
    if (item?.grandChild) {
      if (item?.render) {
        return item.render(
          row?.[item.key]?.[item.child]
            ? row?.[item.key]?.[item.child]?.[item.grandChild] !== ''
              ? row?.[item.key]?.[item.child]?.[item.grandChild]
              : '-'
            : '-' || '-'
        );
      }
      return row?.[item.key]?.[item.child]
        ? row?.[item.key]?.[item.child]?.[item.grandChild] !== ''
          ? row?.[item.key]?.[item.child]?.[item.grandChild]
          : '-'
        : '-' || '-';
    } else if (item?.child) {
      if (item?.render) {
        return item.render(
          row[item.key]
            ? row[item.key][item.child] !== ''
              ? row[item.key][item.child]
              : '-'
            : '-' || '-'
        );
      }
      return row[item.key]
        ? row[item.key][item.child] !== ''
          ? row[item.key][item.child]
          : '-'
        : '-' || '-';
    } else if (item?.render) {
      return item.render(row[item.key], row);
    } else {
      return row[item.key] || '-';
    }
  };

  return (
    <Grid container>
      <Grid item style={{ width: '100%' }}>
        <TableContainer
          component={Paper}
          style={{ maxWidth: '100%', width: '100%', overflowX: 'auto' }}
        >
          <Table aria-label="simple table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ border: '1px solid #E0E0E0' }}>
                <CellWithBorder style={{ position: 'sticky', left: '0' }}>
                  <Checkbox
                    style={{ width: '18px', height: '18px' }}
                    name="select-all"
                    id="all"
                    checked={selectedItems?.length === data?.length}
                    onChange={onSelectAll}
                  />
                </CellWithBorder>
                {numbering && <CellWithBorder>No</CellWithBorder>}
                {header?.map((item) => (
                  <CellWithBorder key={item.title}>
                    <Box width={item?.width || 'auto'}>{item.title}</Box>
                  </CellWithBorder>
                ))}
                {isAction && <CellWithBorder>Aksi</CellWithBorder>}
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.length ? (
                data?.map((row, index) => (
                  <TableRow key={index} sx={{ border: '1px solid #E0E0E0' }}>
                    <TableCell
                      style={{
                        position: 'sticky',
                        left: '0',
                        background: 'white !important',
                        zIndex: 100
                      }}
                    >
                      <Checkbox
                        style={{ width: '18px', height: '18px' }}
                        name={`checkbox-${row.id}`}
                        checked={selectedItems?.includes(row.id)}
                        id={`checkbox-${row.id}`}
                        onChange={() => onSelectItem(row.id)}
                      />
                    </TableCell>
                    {numbering && <TableCell align="left">{index + 1}</TableCell>}

                    {header?.map((item) => (
                      <TableCell align="left" key={item.key}>
                        {renderCell(row, item)}
                      </TableCell>
                    ))}
                    {isAction && <TableCell align="left">{actions(row)}</TableCell>}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={header?.length + 3}
                    style={{
                      textAlign: 'center'
                    }}
                  >
                    <Box sx={{ paddingY: '2rem', fontWeight: 'bold' }}>Tidak ada data</Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default TableGroupHeader;
