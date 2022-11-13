
import Router from 'next/router';
import { UsersService } from '../../../services/UsersServices';
import { useEffect, useRef, useState } from 'react';
import { Passenger } from '../../../models/passenger';
import { Driver } from '../../../models/driver';
import { Admin } from '../../../models/admin';
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
  const [user, setUser] = useState(new Passenger(-1, '','','','','','', null));
  const [userType, setUserType] = useState(true);

  const type = urlParams.get('type');

  const blockUser = () => {
    console.log("te bloquee wachin");
  };

  const unblockUser = () => {
    console.log("ya te desbloquee rey");
  };

 useEffect(() => {
  if(type=="passenger"){
      UsersService.getPassenger(id).then((value) => { 
        setUser(new Passenger(value.userId, value.email,value.firstName,value.lastName,value.username,value.address,value.password, value.wallet));
      }).catch((error) => {
        console.log(error);
      });
      setUserType(false);    
    }
  if(type=="driver"){
      UsersService.getDriver(id).then((value) => { 
        setUser(new Driver(value.userId, value.email,value.firstName,value.lastName,value.username,value.address,value.password, value.wallet, value.vehicle));
      }).catch((error) => {
        console.log(error);
      });
      setUserType(false);
    }
  if(type=="admin"){
      UsersService.getAdmin(id).then((value) => { 
        setUser(new Admin(value.id, value.email, value.firstName, value.lastName, value.password,  value.createdAt));
      }).catch((error) => {
        console.log(error);
      });    
      setUserType(true);
    }
  },//[setUser, setUserType] 
  []);

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
                value={user.firstName}
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
                value={user.lastName}
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
                value={user.email}
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
                value={user.phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          > 
            {(type!="admin") && 
            <Button
              color="error"
              variant="contained"
              disabled={userType}
              onClick={blockUser}
            >
              Block User
            </Button>            
            }

          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          > 
            {(type!="admin") && 
            <Button
              color="primary"
              variant="contained"
              disabled={userType}
              onClick={unblockUser}
            >
              Unblock User
            </Button>            
            }

          </Box>
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
        </Box>
      </Card>
    </form>
  );
};
