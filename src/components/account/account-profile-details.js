
import Router from 'next/router';
import { UsersService } from '../../../services/UsersServices';
import { TripsServices } from '../../../services/TripsServices';
import { PaymentsServices } from '../../../services/PaymentsServices';

import { useEffect, useRef, useState } from 'react';
import { Passenger } from '../../../models/passenger';
import { Driver } from '../../../models/driver';
import { Admin } from '../../../models/admin';
import { Vehicle } from '../../../models/vehicle';
import { UserCalificationMetrics } from '../../components/dashboard/user-calification-metrics';
import { TripsResultsList } from '../../components/dashboard/trips-results';
import { TripsStatus } from '../../components/dashboard/trips-status-metrics';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

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
  TextField,
  Modal,
  Stack
} from '@mui/material';

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AccountProfileDetails = (props) => {

 
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const [user, setUser] = useState(new Driver(-1, '','','','','','', false,null,new Vehicle('','','','','')));
  const [userType, setUserType] = useState(true);
  const [userBlocked, setUserBlock] = useState(false);
  const [noData, setNoData] = useState(false);
  
  const[openModal, setOpenModal] = useState(false);
  const[openModal2, setOpenModal2] = useState(false);
  const[paymentDetail, setPaymentDetail] = useState("");
  const[loadBalance, setLoadBalance] = useState(0);

  const [complaints, setComplaints] = useState(0);

  const type = urlParams.get('type');

  UsersService.getComplaints(id).then((value) => { 
    setComplaints(value);     
  }).catch((error) => {
    console.log(error);
  });

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
      TripsServices.getAmountOfTrips(id, type).then((value) => {
          if(value != 0){
            setNoData(false);
          } else {
            setNoData(true);
          }
      }).catch((error) => {
        console.log(error);
      });

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
      TripsServices.getAmountOfTrips(id, type).then((value) => {
        if(value != 0){
          setNoData(false);
        } else {
          setNoData(true);
        }
      }).catch((error) => {
        console.log(error);
      });

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



  const loadBalanceWallet = () => {
 
    if (PaymentsServices.loadBallanceToWallet(loadBalance,user.wallet)){
      setOpenModal(false);
      setOpenModal2(true);
    }   
    
    
  };




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
         {(type=="driver") && 
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Number of complaints"
                name="Number of complaints"
                readOnly={true}
                //onChange={handleChange}
                required
                value={complaints}
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

            {(type=="passenger") && 
            <Button
              color="info"
              variant="contained" //si block = false => tenbgo que poder apretar => queda blocked user
              onClick={() => {setOpenModal(true)}}
            >
              Cargar saldo
            </Button>            
            }  

          </Box>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style2}>            
                <Stack direction ="column" justifyContent = "space-evenly" spacing={3}>
                    <Stack>
                        <Typography
                            sx={[{ ml: 4 }, { mt : 3}]}
                            variant="h5"
                            color="#000000"
                        > Enter detail for balance charge:
                        </Typography> 
                    </Stack>
                    <Stack 
                            direction="row" 
                            justifyContent="center"
                            spacing={2}>
                            
                            <TextField 
                            required
                            value={paymentDetail} 
                            onChange={(e) => setPaymentDetail(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Payment Detail"
                            variant="outlined"/>
                        </Stack>
                    <Stack>
                        <Typography
                            sx={[{ ml: 4 }, { mt : 3}]}
                            variant="h5"
                            color="#000000"
                        > Load Balance:
                        </Typography> 
                    </Stack>

                        <Stack 
                            direction="row" 
                            justifyContent="center"
                            spacing={2}>
                            
                            <TextField 
                            required
                            value={loadBalance} 
                            onChange={(e) => setLoadBalance(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Amount"
                            variant="outlined"/>
                        </Stack>
                            <Button                                
                                color="info"            
                                onClick={() => {loadBalanceWallet()}}
                                size="large"
                                variant="contained"
                                >Next
                            </Button> 
                </Stack>
            </Box>
        </Modal>
        <Modal
            open={openModal2}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style3}>            
                <Stack direction ="column" justifyContent = "space-evenly" spacing={2}>
                    <Stack>
                        <Typography
                            // sx={[{ ml: 4 }, { mt : 3}]}
                            variant="h6"
                            color="#000000"
                            textAlign='center'                            
                        >  The balance was charged successfully!
                        </Typography> 
                    </Stack>
                    <Button                                
                        color="info"            
                        onClick={() => {setOpenModal2(false)}}
                        size="medium"
                        variant="contained"
                        >Ok
                    </Button> 
                       
                </Stack>         
            </Box>
        </Modal>

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
      {(noData) &&
        <Alert severity="info">
        <AlertTitle>No trips yet</AlertTitle>
        Once this passenger makes a trip, some trip metrics will be available
        </Alert>  
      }
      {(!noData) &&
      <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
        <Grid
            item
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
        </Grid>}
        </Card>

    </form>
  );
};
