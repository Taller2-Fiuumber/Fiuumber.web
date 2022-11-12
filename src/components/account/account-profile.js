import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

import { UsersService } from '../../../services/UsersServices';
import { useEffect, useRef, useState } from 'react';
import { Passenger } from '../../../models/passenger';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};


  export const AccountProfile = (props) => {


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



 <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {passenger==null ? '' : passenger.firstName}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
       color="secondary"
       variant="contained"
        fullWidth
       // variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
};
