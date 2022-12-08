import { useState, useEffect, Text} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { UsersService } from '../../../services/UsersServices';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  Grid,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { TripsServices } from '../../../services/TripsServices';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';


export const TripsResultsList = ({...rest }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [trips, setTrips] = useState([]);
  const [amountOfTrips, setAmountOfTrips] = useState(0);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const type = urlParams.get('type');


  useEffect(() => {
    TripsServices.getAmountOfTrips(id, type).then((value) => {
        setAmountOfTrips(value);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    TripsServices.getTripsById(id, page*rowsPerPage, rowsPerPage, type).then((value) => {
      setTrips(value);
    }).catch((error) => {
      console.log(error);
    });

  }, [page, rowsPerPage]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    // setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (

    // <Card {...rest}>
    <Grid> 
      <PerfectScrollbar>
        <Box sx={{ minWidth: 750 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                From address
                </TableCell>
                <TableCell>
                Destination
                </TableCell>
                <TableCell>
                    Price
                </TableCell>
                <TableCell>
                  Started at
                </TableCell>
                <TableCell>
                  Finished at
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {trips.map((trip, index) => (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell>
                  {trip.from_address}
                  </TableCell>
                  <TableCell>
                  {trip.to_address}
                  </TableCell>
                  <TableCell>
                    {trip.finalPrice}
                  </TableCell>
                  <TableCell>
                    {trip.start}
                  </TableCell>
                  <TableCell>
                    {trip.finish}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={amountOfTrips}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[2, 10, 25]}
      />
      </Grid>
  );
};
