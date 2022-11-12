
import Router from 'next/router';
import { UsersService } from '../../../services/UsersServices';
import { useEffect, useRef, useState } from 'react';
import { Passenger } from '../../../models/passenger';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';



export const AccountProfileDetails = (props) => {

 
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  console.log(id)
  const [passenger, setPassenger] = useState(new Passenger(-1, '','','','','','', null));

 useEffect(() => {
   UsersService.getPassenger(id).then((value) => { 
     // console.log(value);
     setPassenger(new Passenger(value.userId, value.email,value.firstName,value.lastName,value.username,value.address,value.password, value.wallet));
     console.log('passe', passenger)
   }).catch((error) => {
     console.log(error);
   });
   
 }, [setPassenger]);

 console.log(passenger);


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  //console.log('router path', Router.pathname);
  return (
    <form
      autoComplete="off"
      noValidate
      
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={passenger.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={passenger.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={passenger.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={passenger.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            //color="primary"
            color="secondary"
            variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
