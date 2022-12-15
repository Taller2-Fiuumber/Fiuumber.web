import { useState, useEffect, Text} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
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


export const FareHistoryList = ({...rest }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [fares, setFares] = useState([]);
  const [amountOfFares, setAmountOfFares] = useState(0);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const type = urlParams.get('type');


  useEffect(() => {
    TripsServices.getAmountOfFares().then((value) => {
        setAmountOfFares(value);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  

  useEffect(() => {
    TripsServices.getFaresPages(page*rowsPerPage, rowsPerPage).then((value) => {
      setFares(value);
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
                Selected
                </TableCell>
                <TableCell>
                Base Price
                </TableCell>
                <TableCell>
                Duration
                </TableCell>
                <TableCell>
                Distance
                </TableCell>
                <TableCell>
                Daily Trips Driver
                </TableCell>
                <TableCell>
                Daily Trips Passenger
                </TableCell>
                <TableCell>
                Monthly Trips Driver
                </TableCell>
                <TableCell>
                Monthly Trips Passenger
                </TableCell>
                <TableCell>
                Seniority Driver
                </TableCell>
                <TableCell>
                Seniority Passenger
                </TableCell>
                <TableCell>
                Recent Trips Passenger
                </TableCell>
                <TableCell>
                Night Shift
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {fares.map((fares, index) => (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell>
                  {fares.selected}
                  </TableCell>
                  <TableCell>
                  {fares.minimum}
                  </TableCell>
                  <TableCell>
                    {fares.duration}
                  </TableCell>
                  <TableCell>
                    {fares.distance}
                  </TableCell>
                  <TableCell>
                    {fares.dailyTripAmountDriver}
                  </TableCell>
                  <TableCell>
                  {fares.dailyTripAmountPassenger}
                  </TableCell>
                  <TableCell>
                  {fares.monthlyTripAmountDrive}
                  </TableCell>
                  <TableCell>
                    {fares.monthlyTripAmountPassenger}
                  </TableCell>
                  <TableCell>
                    {fares.seniorityDriver}
                  </TableCell>
                  <TableCell>
                    {fares.seniorityPassenger}
                  </TableCell>
                  <TableCell>
                    {fares.recentTripAmount}
                  </TableCell>
                  <TableCell>
                    {fares.nightShift}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={amountOfFares}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[2, 5, 10, 25]}
      />
      </Grid>
  );
};
