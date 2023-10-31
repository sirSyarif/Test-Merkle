import { styled } from '@mui/material/styles';
import { TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';


const CellWithBorder = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    border: '1px solid #E0E0E0',
    backgroundColor: '#f5f5f5',
    color: 'black'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: 'black'
  }
}));

export default CellWithBorder
