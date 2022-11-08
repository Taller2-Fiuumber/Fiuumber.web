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
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const DriverListResults = ({...rest }) => {
  const [selectedDriverIds, setSelectedDriverIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [drivers, setDrivers] = useState([]);


  useEffect(() => {
    UsersService.getDrivers().then((value) => { 
      console.log(value);
      setDrivers(value);
    }).catch((error) => {
      console.log(error);
    });
    
  }, [setDrivers]);

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
                  Vehicle Domain
                </TableCell>
                <TableCell>
                  Profile
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.slice(0, limit).map((driver) => (
                <TableRow
                  hover
                  key={driver.id}
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
        count={drivers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
