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

export const AdminListResults = ({...rest }) => {
  const [selectedAdminIds, setSelectedAdminIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0); //0
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    UsersService.getAdmins().then((value) => {
      console.log(value);
      setAdmins(value);
    }).catch((error) => {
      console.log(error);
    });
    
  }, [setAdmins]);

  // const handleLimitChange = (event) => {
  //   setLimit(event.target.value);
  // };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
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
              {admins.slice(rowsPerPage*page, rowsPerPage*(page+1)).map((admin) => (
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
                    onClick={() => {
                      Router.push("/account?id=" + admin.adminId + "&type=admin")
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
        count={admins.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[2, 5, 10, 25]}
      />
    </Card>
  );
};
