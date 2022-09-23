import { TableCell, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// import { StyledTableCell, StyledTableRow } from "../../components/styledtabelcell/StyledTabelCell";

export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.background.default,
      color: "grey",
      fontWeight: 500,
    },
    body: {
      color: "#555",
      fontSize: 14,
    },
  }))(TableCell);

export const StyledTableRow = withStyles(() => ({
    root: {},
  }))(TableRow);

export const TableCellStyled = withStyles(() => ({
    head: {
      // backgroundColor: theme.palette.background.default,
      // color: 'grey',
      fontWeight : 500,
    },
    body: {
        color : '#555',
      fontSize: 14,
    },
  }))(TableCell);

export const GeneralStyledTableCell = withStyles(() => ({
    head: {
    
    },
  }))(TableCell);