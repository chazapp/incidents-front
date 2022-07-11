import React, { useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { Incident } from '../index.d';
import IncidentAdd from './IncidentAdd';
import { LinearProgress } from '@mui/material';


interface HeadCell {
    disablePadding: boolean;
    id: keyof Incident;
    label: string;
    numeric: boolean;
}

  
interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Incident) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}
  

const headCells: HeadCell[] = [
    { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
    { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
    { id: 'severity', numeric: false, disablePadding: true, label: 'Severity' },
    { id: 'created_at', numeric: false, disablePadding: true, label: 'Created At' },
    { id: 'updated_at', numeric: false, disablePadding: true, label: 'Updated At' },
];


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
    ): (
    a: { [key in Key]: number | string | Date },
    b: { [key in Key]: number | string | Date },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof Incident) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  interface EnhancedTableToolbarProps {
    numSelected: number;
    setSelectedIncident: React.Dispatch<React.SetStateAction<Incident | null>>;
  }
  
  const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, setSelectedIncident } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        <IncidentAdd setSelectedIncident={setSelectedIncident}/>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Incidents
          </Typography>
      </Toolbar>
    );
  };


function IncidentTable(props: { 
    rows: Incident[],
    onSelect: React.Dispatch<React.SetStateAction<Incident | null>>,
    isLoading: boolean,
    pagination: {
        page: number,
        setPage: React.Dispatch<React.SetStateAction<number>>,
        rowsPerPage: number,
        setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
        totalRows: number,
    }
}) {
    const { rows, onSelect, isLoading, pagination } = props;
    const { page, setPage, rowsPerPage, setRowsPerPage, totalRows } = pagination;

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Incident>('id');
    const [selected] = React.useState<Incident[]>([]);
    const [dense] = React.useState(true);

    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Incident,
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, rowsPerPage - rows.length) : 0;

    return (
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6" id="tableTitle">Displaying {rows.length} of {totalRows} incidents</Typography>
        <Paper sx={{ width: '100%', mb: 2, padding: "1em" }} elevation={3}>
          <EnhancedTableToolbar numSelected={selected.length} setSelectedIncident={onSelect}/>
          {isLoading ? <LinearProgress data-cy="incidents-table-linear-progress" /> : null}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              data-cy="incident-table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody
              >
                {rows.slice().sort(getComparator(order, orderBy))
                  .map((row, index) => {
                    const { title, status, severity, created_at, updated_at } = row;
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        onClick={(event) => onSelect(row) }
                        sx={{
                          cursor: 'pointer',
                        }}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.id}
                        </TableCell>
                        <TableCell align="left">{title}</TableCell>
                        <TableCell align="left">{status}</TableCell>
                        <TableCell align="left">{severity}</TableCell>
                        <TableCell align="left">{new Date(created_at).toDateString()}</TableCell>
                        <TableCell align="left">{new Date(updated_at).toDateString()}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{
              "aria-label": "incident-table-next-page",
            }}
          />
        </Paper>
      </Box>
  );
}

export default IncidentTable;