import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Avatar, Tooltip, Button, TextField, Select, MenuItem, InputLabel, FormControl, Grid, TablePagination, TableSortLabel, Checkbox, Switch
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const HeaderContainer = styled(Grid)(({ theme }) => ({
  marginBottom: '20px',
}));

const CreateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#7F3DFF',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#5900ff',
  },
}));

const initialInvoices = [
  { id: 5020, name: 'Steven Myers', email: 'lori06@morse.com', total: 2029, date: '10 Oct 2024', status: 'Paid', balance: 0, avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 5008, name: 'Monica Fuller', email: 'gdurham@lee.com', total: 2032, date: '22 Oct 2024', status: 'Paid', balance: 0, avatar: 'https://i.pravatar.cc/40?img=2' },
  { id: 5010, name: 'Chad Davis', email: 'jgutierrez@jackson.com', total: 2060, date: '06 Oct 2024', status: 'Pending', balance: 200, avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: 5007, name: 'Katherine Kennedy', email: 'tatejennifer@allen.net', total: 2230, date: '01 Oct 2024', status: 'Paid', balance: 0, avatar: 'https://i.pravatar.cc/40?img=4' },
  { id: 5015, name: 'Wendy Weber', email: 'esparzadaniel@allen.com', total: 2477, date: '16 Oct 2024', status: 'Overdue', balance: 100, avatar: 'https://i.pravatar.cc/40?img=5' },
  { id: 5018, name: 'Randy Rich', email: 'baldwinjodie@washington.com', total: 2483, date: '29 Oct 2024', status: 'Pending', balance: 300, avatar: 'https://i.pravatar.cc/40?img=6' },
  { id: 4993, name: 'Christina Collier', email: 'williamshenry@moon-smith.com', total: 2713, date: '17 Oct 2024', status: 'Pending', balance: 150, avatar: 'https://i.pravatar.cc/40?img=7' },
  { id: 5027, name: 'Mary Garcia', email: 'giordan@fernandez-coleman.com', total: 2719, date: '13 Oct 2024', status: 'Paid', balance: 0, avatar: 'https://i.pravatar.cc/40?img=8' },
  { id: 4992, name: 'Amanda Phillips', email: 'querrero@brandvibesley-harper.com', total: 2771, date: '26 Oct 2024', status: 'Paid', balance: 0, avatar: 'https://i.pravatar.cc/40?img=9' },
];

const InvoiceTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc'); // Sorting order: asc or desc
  const [orderBy, setOrderBy] = useState('id'); // Column to sort by
  const [selected, setSelected] = useState([]); // For checkbox selection
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [statusFilter, setStatusFilter] = useState('All');

  const [searchItem, setSearchItem] = useState('');

  const filteredInvoices = initialInvoices.filter(invoice => {
    const matchesSearch = invoice.name.toLowerCase().includes(searchItem.toLowerCase());
    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Theme Definitions
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#7F3DFF', // Primary color for light mode
      },
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: '#f5f5f5', // Background color for light mode
          },
        },
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
      },
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: '#1e1e1e', // Background color for dark mode
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ffffff',
              },
              '&:hover fieldset': {
                borderColor: '#7F3DFF',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#7F3DFF',
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ffffff',
              },
              '&:hover fieldset': {
                borderColor: '#7F3DFF',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#7F3DFF',
              },
            },
          },
        },
      },
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortComparator = (a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return a[orderBy] > b[orderBy] ? -1 : 1;
  };

  const sortedInvoices = filteredInvoices.sort(sortComparator);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = sortedInvoices.map((invoice) => invoice.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const renderStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return <CheckCircleIcon color="success" />;
      case 'Pending':
        return <HourglassEmptyIcon color="warning" />;
      case 'Overdue':
        return <CancelIcon color="error" />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Grid container alignItems="center" justifyContent="space-between">
        {/* Dark Mode Toggle */}
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      
      </Grid>

      <HeaderContainer container spacing={2}>
  <Grid item xs={12} sm={6}>
    <CreateButton variant="contained">
      + Create Invoice
    </CreateButton>
  </Grid>
  <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <TextField
      label="Search Invoice"
      variant="outlined"
      size="small"
      fullWidth
      value={searchItem}
      onChange={(e) => setSearchItem(e.target.value)}
      style={{ marginRight: '10px' }}
    />
    <FormControl variant="outlined" size="small" style={{ width: '150px' }}>
      <InputLabel>Status</InputLabel>
      <Select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        label="Status"
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Overdue">Overdue</MenuItem>
      </Select>
    </FormControl>
  </Grid>
</HeaderContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < sortedInvoices.length}
                  checked={sortedInvoices.length > 0 && selected.length === sortedInvoices.length}
                  onChange={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all invoices' }}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={order}
                  onClick={() => handleSort('id')}
                >
                  #
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={order}
                  onClick={() => handleSort('name')}
                >
                  Client
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">
                <TableSortLabel
                  active={orderBy === 'total'}
                  direction={order}
                  onClick={() => handleSort('total')}
                >
                  Total
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={order}
                  onClick={() => handleSort('date')}
                >
                  Due Date
                </TableSortLabel>
              </TableCell>
                                <TableCell>
                    <TableSortLabel
                        active={orderBy === 'balance'}
                        direction={orderBy === 'balance' ? order : 'asc'}
                        onClick={() => handleSort('balance')}
                    >
                        Balance
                    </TableSortLabel>
                    </TableCell>
              
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice) => {
              const isItemSelected = isSelected(invoice.id);
              return (
                <TableRow
                  key={invoice.id}
                  hover
                  onClick={(event) => handleClick(event, invoice.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': `invoice-checkbox-${invoice.id}` }}
                    />
                  </TableCell>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{renderStatusIcon(invoice.status)}</TableCell>
                  <TableCell>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Avatar src={invoice.avatar} alt={invoice.name} style={{ marginRight: '10px' }} />
    <div>
      <div>{invoice.name}</div>
      <div style={{ fontSize: '0.85rem', color: '#666' }}>{invoice.email}</div> {/* Email displayed below name */}
    </div>
  </div>
</TableCell>
<TableCell align="right">${invoice.total}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.balance}</TableCell> {/* New Balance Column */}

                  
                  <TableCell align="right">
                    <IconButton>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredInvoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
};

export default InvoiceTable;
