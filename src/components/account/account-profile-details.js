
import Router from 'next/router';
import { UsersService } from '../../../services/UsersServices';
import { useEffect, useRef, useState } from 'react';
import { Passenger } from '../../../models/passenger';
import { Driver } from '../../../models/driver';
import { Admin } from '../../../models/admin';
import { Vehicle } from '../../../models/vehicle';
import { UserCalificationMetrics } from '../../components/dashboard/user-calification-metrics';
import { TripsResultsList } from '../../components/dashboard/trips-results';
import { TripsStatus } from '../../components/dashboard/trips-status-metrics';


import {
  Box,
  Button,
  Container,
  Typography,
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
  const [user, setUser] = useState(new Driver(-1, '','','','','','', false,null,new Vehicle('','','','','')));
  const [userType, setUserType] = useState(true);
  const [userBlocked, setUserBlock] = useState(false);

  const type = urlParams.get('type');

  const blockUser = () => {
    UsersService.blockUser(id).then((value) => { 
      setUserBlock(true);     
    }).catch((error) => {
      console.log(error);
    });
  };

  const unblockUser = () => {
    UsersService.unblockUser(id).then((value) => { 
      setUserBlock(false);     
    }).catch((error) => {
      console.log(error);
    });
  };

 useEffect(() => {
  if(type=="passenger"){
      UsersService.getPassenger(id).then((value) => { 
        setUser(new Passenger(value.userId, value.email,value.firstName,value.lastName,value.username,value.address,value.password, value.blocked,value.wallet));
        setUserBlock(value.blocked);     
      }).catch((error) => {
        console.log(error);
      });
      setUserType(false);

  }
  if(type=="driver"){
      UsersService.getDriver(id).then((value) => { 
        console.log("valor",value);
        const driverVehicle= new Vehicle(value.vehicle.domain,value.vehicle.modelYear,value.vehicle.colorName,value.vehicle.vehicle.brand,value.vehicle.vehicle.model)
        setUser(new Driver(value.userId, value.email,value.firstName,value.lastName,value.username,value.address,value.password, value.blocked,value.wallet, driverVehicle));
        setUserBlock(value.blocked);      
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
  }, [setUser, id]);

  console.log(user.vehicle);
  console.log(user);




  return (
    <form
      autoComplete="off"
      noValidate
      
      {...props}
    >
      <Card>
        <CardHeader
          subheader={type.toLocaleUpperCase()}
          title="PROFILE"
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
                label="First name"
                name="firstName"
                required
                readOnly={true}
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
                readOnly={true}
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
                readOnly={true}
                // onChange={handleChange}
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
                label="Id"
                name="id"
                readOnly={true}
                // onChange={handleChange}
                required
                value={id}
                variant="outlined"
              />
            </Grid>
            {(type!="admin") && 
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Username"
                name="Username"
                readOnly={true}
                // onChange={handleChange}
                required
                value={user.username}
                variant="outlined"
              />
            </Grid>
         }
          {(type!="admin") && 
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Address"
              name="Address"
              readOnly={true}
              required
              value={user.address}
              variant="outlined"
            />
          </Grid>
        }
          {(type=="driver") &&
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Domain"
              name="Domain"
              readOnly={true}
              required
              value={user.vehicle.domain}
              variant="outlined"
            />
          </Grid>
        }
          {(type=="driver") && 
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Model"
              name="Model"
              readOnly={true}
              required
              value={user.vehicle.model}
              variant="outlined"
            />
          </Grid>
        }
        {(type=="driver") && 
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="ModelYear"
              name="ModelYear"
              readOnly={true}
              required
              value={user.vehicle.modelYear}
              variant="outlined"
            />
          </Grid>
        }
        {(type=="driver") && 
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Color"
              name="Color"
              readOnly={true}
              required
              value={user.vehicle.colorName}
              variant="outlined"
            />
          </Grid>
        }
        {(type=="driver") && 
          <Grid
            item
            md={6}
            xs={12}
          >
            <TextField
              fullWidth
              label="Brand"
              name="Brand"
              readOnly={true}
              required
              value={user.vehicle.brand}
              variant="outlined"
            />
          </Grid>
        }
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
              variant="contained" //si block = false => tenbgo que poder apretar => queda blocked user
              disabled={userBlocked}  //si esta desblockeado el user, el boton debe poder apetarse
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
              variant="contained" //si block = false => no tenbgo que poder apretar => niego block user
              disabled={!userBlocked} //si esta blockeado el user, el boton debe poder apetarse
              onClick={unblockUser}
            >
              Unblock User
            </Button>            
            }

          </Box>
        </Box>
        <Container maxWidth={false}>

      </Container>
      {/* </Card> */}
      <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
        <Grid
            item
            // lg={6}
            // md={6}
            // xl={6}
            // xs={12}
            lg={11}
            md={12}
            xl={11}
            xs={12}
          >
            { (type!="admin") &&
            <Typography
              sx={{ m: 2 }}
              variant="h5"
              color="#000000"
              textAlign="center"
            > User Califications Metrics
            </Typography>
            }
            { (type!="admin") &&
              <UserCalificationMetrics sx={{ height: 650 }}  />
            }
            { (type!="admin") &&
            <Typography
              sx={{ m: 2 }}
              variant="h5"
              color="#000000"
              textAlign="center"
            > Trips history
            </Typography>
            }
            { (type!="admin") &&
               <TripsResultsList sx={{ width: 850 }}  />
            }
             { (type!="admin") &&
            <Typography
              sx={{ m: 2 }}
              variant="h5"
              color="#000000"
              textAlign="center"
            > Trips Status Metrics
            </Typography>
            }
            { (type!="admin") &&
               <TripsStatus sx={{ width: 850 }}  />
            }
            </Grid>
        </Grid>
        </Card>

    </form>
  );
};
