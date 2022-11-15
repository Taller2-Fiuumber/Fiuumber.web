import { useState, useEffect, Text} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
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



export const AdminListResults = ({...rest }) => {
  const [selectedAdminIds, setSelectedAdminIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0); //0
  const [admins, setAdmins] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    UsersService.getAdmins().then((value) => {
      setAdmins(value);
    }).catch((error) => {
      console.log(error);
    });
    
  }, []);

 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
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
                  placeholder="Search admin by first name"
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
                {/* <TableCell>
                  Contact
                </TableCell>
                <TableCell>
                  Created At
                </TableCell> */}
                <TableCell>
                  Perfil
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.filter(admin=> {
                if(searchInput === ''){
                  return admin;
                } else if (admin.firstName.toLowerCase().includes(searchInput.toLowerCase())){
                  return admin;
                }}).slice(rowsPerPage*page, rowsPerPage*(page+1)).map((admin, index) => (
                <TableRow
                  hover
                  key={index}
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
                  {/* <TableCell>
                    {admin.email}
                  </TableCell>
                  <TableCell>
                    {admin.createdAt}
                  </TableCell> */}
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
