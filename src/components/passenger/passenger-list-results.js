import { useState, useEffect, Text} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { UsersService } from '../../../services/UsersServices';
import Router from 'next/router';
import {
  Avatar,
  Button,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const PassengerListResults = ({...rest }) => {
  const [selectedPassengerIds, setSelectedPassengerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    UsersService.getPassengers().then((value) => { 
      console.log(value);
      setPassengers(value);
    }).catch((error) => {
      console.log(error);
    });
    
  }, [setPassengers]);


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
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
                  Contact
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
              {passengers.slice(0, limit).map((passenger) => (
                <TableRow
                  hover
                  key={passenger.id}
                  selected={selectedPassengerIds.indexOf(passenger.id) !== -1}
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
                      Router.push('/account')
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
        count={passengers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
