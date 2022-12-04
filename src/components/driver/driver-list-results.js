import { useState, useEffect, Text} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { UsersService } from '../../../services/UsersServices';
import Router from 'next/router';
import { Search as SearchIcon } from '../../icons/search';

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

import { getInitials } from '../../utils/get-initials';

export const DriverListResults = ({...rest }) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [drivers, setDrivers] = useState([]);
  const [amountOfDrivers, setAmountOfDrivers] = useState(0);

  useEffect(() => {
    UsersService.getAmountOfDriver().then((value) => {
      setAmountOfDrivers(value);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    UsersService.getDrivers(page * rowsPerPage, rowsPerPage).then((value) => {
      setDrivers(value);
    }).catch((error) => {
      console.log(error);
    });

  }, [rowsPerPage, page]);


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
                  placeholder="Search driver by email"
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
                  Vehicle Domain
                </TableCell>
                <TableCell>
                  Profile
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.filter(driver=> {
                if(searchInput === ''){
                  return driver;
                } else if (driver.email.includes(searchInput.toLowerCase())){
                  return driver;
                }}).map((driver,index) => (
                <TableRow
                  hover
                  key={index}
                  selected={selectedDriverIds.indexOf(driver.id) !== -1}
                >
                  <TableCell>
                    {driver.firstName}
                  </TableCell>
                  <TableCell>
                    {driver.lastName}
                  </TableCell>
                  <TableCell>
                    {driver.username}
                  </TableCell>
                  <TableCell>
                    {driver.email}
                  </TableCell>
                  <TableCell>
                    {driver.address}
                  </TableCell>
                  <TableCell>
                    {driver.vehicle.domain}
                  </TableCell>
                  <TableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      Router.push("/account?id=" + driver.userId + "&type=driver")
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
        count={amountOfDrivers}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[2, 5, 10, 25]}
      />
    </Card>
  );
};
