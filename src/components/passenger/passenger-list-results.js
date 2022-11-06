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
  Typography,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const PassengerListResults = ({...rest }) => {
  const [selectedPassengerIds, setSelectedPassengerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    UsersService.getPassengers().then((value) => { //aca surge el problema del doble print
      console.log(value);
      setPassengers(value);
    }).catch((error) => {
      console.log(error);
    });
    
  }, [setPassengers]);


  const handleSelectAll = (event) => {
    let newSelectedPassengerIds;

    if (event.target.checked) {
      newSelectedPassengerIds = passengers.map((passenger) => passenger.id);
    } else {
      newSelectedPassengerIds = [];
    }

    setSelectedPassengerIds(newSelectedPassengerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPassengerIds.indexOf(id);
    let newSelectedPassengerIds = [];

    if (selectedIndex === -1) {
      newSelectedPassengerIds = newSelectedPassengerIds.concat(selectedPassengerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedPassengerIds = newSelectedPassengerIds.concat(selectedPassengerIds.slice(1));
    } else if (selectedIndex === selectedPassengerIds.length - 1) {
      newSelectedPassengerIds = newSelectedPassengerIds.concat(selectedPassengerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPassengerIds = newSelectedPassengerIds.concat(
        selectedPassengerIds.slice(0, selectedIndex),
        selectedPassengerIds.slice(selectedIndex + 1)
      ); 
    }

    setSelectedPassengerIds(newSelectedPassengerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    //setPassengers(fetchUsers());
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selectedPassengerIds.length === passengers.length}
                    color="primary"
                    indeterminate={
                      selectedPassengerIds.length > 0
                      && selectedPassengerIds.length < passengers.length
                    }
                    onChange={handleSelectAll}
                  /> */}
                </TableCell>
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
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPassengerIds.indexOf(passenger.id) !== -1}
                      onChange={(event) => handleSelectOne(event, passenger.id)}
                      value="true"
                    />
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
                        {passenger.firstName}
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
                        {passenger.lastName}
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
                        {passenger.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {passenger.email}
                  </TableCell>
                  <TableCell>
                    {/* {`${passenger.address}`} */}
                    {passenger.address}
                  </TableCell>
                  <TableCell>
                    {/* {passenger.phone} */}
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

// PassengerListResults.propTypes = {
//   passengers: PropTypes.array.isRequired
// };
