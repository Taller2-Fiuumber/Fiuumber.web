import { useState, useEffect, Text} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { UsersService } from '../../../services/UsersServices';

import {
  Avatar,
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
    UsersService.getDrivers().then((value) => { //aca surge el problema del doble print
      console.log(value);
      setDrivers(value);
    }).catch((error) => {
      console.log(error);
    });
    
  }, [setDrivers]);



  const handleSelectAll = (event) => {
    let newSelectedDriverIds;

    if (event.target.checked) {
      newSelectedDriverIds = drivers.map((driver) => driver.id);
    } else {
      newSelectedDriverIds = [];
    }

    setSelectedDriverIds(newSelectedDriverIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDriverIds.indexOf(id);
    let newSelectedDriverIds = [];

    if (selectedIndex === -1) {
      newSelectedDriverIds = newSelectedDriverIds.concat(selectedDriverIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDriverIds = newSelectedDriverIds.concat(selectedDriverIds.slice(1));
    } else if (selectedIndex === selectedDriverIds.length - 1) {
      newSelectedDriverIds = newSelectedDriverIds.concat(selectedDriverIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDriverIds = newSelectedDriverIds.concat(
        selectedDriverIds.slice(0, selectedIndex),
        selectedDriverIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDriverIds(newSelectedDriverIds);
  };

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
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={passenger.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(passenger.firstName)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {driver.firstName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={passenger.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(passenger.firstName)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {driver.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={passenger.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(passenger.firstName)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {driver.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {driver.email}
                  </TableCell>
                  <TableCell>
                    {/* {`${passenger.address}`} */}
                    {driver.address}
                  </TableCell>
                  <TableCell>
                    {driver.vehicle.domain}
                  </TableCell>
                  <TableCell>
                    {/* {format(passenger.createdAt, 'dd/MM/yyyy')} */}
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

// DriverListResults.propTypes = {
//   drivers: PropTypes.array.isRequired
// };
