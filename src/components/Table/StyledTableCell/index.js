import { styled } from "@mui/material/styles";
import { TableCell } from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f5f5f5",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "black",
  },
}));

export default StyledTableCell;
