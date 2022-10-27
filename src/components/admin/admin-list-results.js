import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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

export const AdminListResults = ({ admins, ...rest }) => {
  const [selectedAdminIds, setSelectedAdminIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedadminIds;

    if (event.target.checked) {
      newSelectedAdminIds = admins.map((admin) => admin.id);
    } else {
      newSelectedAdminIds = [];
    }

    setSelectedAdminIds(newSelectedAdminIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAdminIds.indexOf(id);
    let newSelectedAdminIds = [];

    if (selectedIndex === -1) {
      newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds, id);
    } else if (selectedIndex === 0) {
      newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds.slice(1));
    } else if (selectedIndex === selectedAdminIds.length - 1) {
      newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedAdminIds = newSelectedAdminIds.concat(
        selectedAdminIds.slice(0, selectedIndex),
        selectedAdminIds.slice(selectedIndex + 1)
      );
    }

    setSelectedAdminIds(newSelectedAdminIds);
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
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAdminIds.length === admins.length}
                    color="primary"
                    indeterminate={
                      selectedAdminIds.length > 0
                      && selectedAdminIds.length < admins.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
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
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAdminIds.indexOf(admin.id) !== -1}
                      onChange={(event) => handleSelectOne(event, admin.id)}
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
                      <Avatar
                        src={admin.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(admin.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {admin.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {admin.email}
                  </TableCell>
                  <TableCell>
                    {`${admin.address.city}, ${admin.address.state}, ${admin.address.country}`}
                  </TableCell>
                  <TableCell>
                    {admin.phone}
                  </TableCell>
                  <TableCell>
                    {format(admin.createdAt, 'dd/MM/yyyy')}
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

AdminListResults.propTypes = {
  admins: PropTypes.array.isRequired
};
