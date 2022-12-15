import { useState, useEffect, Text} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { UsersService } from '../../../services/UsersServices';
import Router from 'next/router';
import { Search as SearchIcon } from '../../icons/search';
import {Passenger} from '../../../models/passenger'
import {
  Button,
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  SvgIcon,
  Typography,
  List,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';


export const PassengerListResults = ({...rest }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedPassengerIds, setSelectedPassengerIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);


  const [passengers, setPassengers] = useState([]);
  const [amountOfPassenger, setAmountOfPassenger] = useState(0);

  useEffect(() => {
    getInitialData(page, rowsPerPage);

  }, []);


  const getInitialData = (page, rowsPerPage) => {
    UsersService.getAmountOfPassenger().then((value) => {      
      setAmountOfPassenger(value);      
    }).catch((error) => {
      console.log(error);
    });   
 
    UsersService.getPassengers(page * rowsPerPage, rowsPerPage).then((value) => {
      const passengers_aux = value ? value:[]
      setPassengers(passengers_aux);
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleChangeRowsPerPage = (event) => {   
    setRowsPerPage(parseInt(event.target.value));
    getInitialData(page, parseInt(event.target.value));    
    
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    getInitialData(newPage, rowsPerPage);

  };

  return (

    <Card {...rest}>
      <Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          color="action"
                          fontSize="small"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search passenger by email"
                  variant="outlined"
                  onChange={event=> setSearchInput(event.target.value)}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Last Name
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Address
                </TableCell>
                <TableCell>
                  Profile
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              passengers.filter(passenger=> {
                if(searchInput === ''){
                  return passenger;
                } else if (passenger.email.includes(searchInput.toLowerCase())){
                  return passenger;
                }}).map((passenger, index) => (
                <TableRow
                  hover
                  key={index}
                  selected={selectedPassengerIds.indexOf(passenger.userId) !== -1}
                >
                  <TableCell>
                    {passenger.firstName}
                  </TableCell>
                  <TableCell>
                    {passenger.lastName}
                  </TableCell>
                  <TableCell>
                    {passenger.username}
                  </TableCell>
                  <TableCell>
                    {passenger.email}
                  </TableCell>
                  <TableCell>
                    {passenger.address}
                  </TableCell>
                  <TableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      Router.push("/account?id=" + passenger.userId + "&type=passenger")
                    }}
                  >
                  View Profile
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={amountOfPassenger}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
