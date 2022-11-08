import { useState, useEffect, Text} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { UsersService } from '../../../services/UsersServices';
// import * as React from "react";
// import * as ReactDOM from "react-dom";

// import { useNavigate } from "react-router-dom";

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

export const AdminListResults = ({...rest }) => {
  const [selectedAdminIds, setSelectedAdminIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    UsersService.getAdmins().then((value) => {
      console.log(value);
      setAdmins(value);
    }).catch((error) => {
      console.log(error);
    });
    
  }, [setAdmins]);

  // let navigate = useNavigate(); 
  // const routeChange = (selected) =>{ 
  //   navigate(selected);
  // }

  // const handleSelectAll = (event) => {
  //   let newSelectedadminIds;

  //   if (event.target.checked) {
  //     newSelectedAdminIds = admins.map((admin) => admin.id);
  //   } else {
  //     newSelectedAdminIds = [];
  //   }

  //   setSelectedAdminIds(newSelectedAdminIds);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedAdminIds.indexOf(id);
  //   let newSelectedAdminIds = [];

  //   if (selectedIndex === -1) {
  //     newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds.slice(1));
  //   } else if (selectedIndex === selectedAdminIds.length - 1) {
  //     newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelectedAdminIds = newSelectedAdminIds.concat(
  //       selectedAdminIds.slice(0, selectedIndex),
  //       selectedAdminIds.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedAdminIds(newSelectedAdminIds);
  // };

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
                {/* <TableCell>
                  Username
                </TableCell> */}
                <TableCell>
                  Contact
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
                <TableCell>
                  Perfil
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.slice(0, limit).map((admin) => (
                <TableRow
                  hover
                  key={admin.id}
                  selected={selectedAdminIds.indexOf(admin.id) !== -1}
                >
                 
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {admin.firstName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {admin.lastName}
                  </TableCell>
                  <TableCell>
                    {admin.email}
                  </TableCell>
                  <TableCell>
                    {admin.createdAt}
                  </TableCell>
                  <TableCell>
                  <Button
                    color="secondary"
                    variant="contained"
                    // onclick={  }
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
        count={admins.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

// AdminListResults.propTypes = {
//   admins: PropTypes.array.isRequired
// };
