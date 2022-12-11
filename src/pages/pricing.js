import Head from 'next/head';
import { Box, BoxProps, Container, Grid, Input, Typography, TextField, InputAdornment, Button, Stack, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DashboardLayout } from '../components/dashboard-layout';
import { PricesRules } from '../../models/prices';
import {useState} from 'react';
import { TripsServices} from '../../services/TripsServices';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 850,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Page = () => {
    //Constantes de sistema
    const[openModal1, setOpenModal1] = useState(false);
    const[openModal2, setOpenModal2] = useState(false);

    

    //Constantes para la formula
    const[time, setTime] = useState("");
    const[duration, setduration] = useState("");
    const[distance, setdistance] = useState("");
    const[dailyTripAmountDriver, setDailyTripAmountDriver] = useState("");
    const[dailyTripAmountPassenger, setDailyTripAmountPassenger] = useState("");
    const[monthlyTripAmountDriver, setMonthlyTripAmountDriver] = useState("");
    const[monthlyTripAmountPassenger, setMonthlyTripAmountPassenger] = useState("");
    const[seniorityDriver, setSeniorityDriver] = useState("");
    const[seniorityPassenger, setSeniorityPassenger] = useState("");
    const[recentTripAmount, setRecentTripAmount] = useState("");
    const[basePrice, setBasePrice] = useState("");
    const[origin, setOrigin] = useState("");
    const[destination, setDestination] = useState("");
    const[calculatedPrice, setCalculatedPrice] = useState("");

    //Datos dummy para testeo
    const[dailyTripAmountDriverDummy, setDailyTripAmountDriverDummy] = useState("");
    const[dailyTripAmountPassengerDummy, setDailyTripAmountPassengerDummy] = useState("");
    const[monthlyTripAmountDriverDummy, setMonthlyTripAmountDriverDummy] = useState("");
    const[monthlyTripAmountPassengerDummy, setMonthlyTripAmountPassengerDummy] = useState("");
    const[seniorityDriverDummy, setSeniorityDriverDummy] = useState("");
    const[seniorityPassengerDummy, setSeniorityPassengerDummy] = useState("");
    const[recentTripAmountDummy, setRecentTripAmountDummy] = useState("");
    
    
    const submitRules = () => { 
    
        const newRules = new PricesRules( 
            time,
            duration, 
            distance,
            dailyTripAmountDriver,
            dailyTripAmountPassenger, 
            monthlyTripAmountDriver,
            monthlyTripAmountPassenger, 
            seniorityDriver,
            seniorityPassenger, 
            recentTripAmount);
            
        TripsServices.applyPricingRules(newRules);
    };

    const testRules = () => { 
        const newRules = new PricesRules( 
            time,
            duration, 
            distance,
            dailyTripAmountDriver,
            dailyTripAmountPassenger, 
            monthlyTripAmountDriver,
            monthlyTripAmountPassenger, 
            seniorityDriver,
            seniorityPassenger, 
            recentTripAmount);
        TripsServices.testPricingRules(newRules, 
            dailyTripAmountDriverDummy,
            dailyTripAmountPassengerDummy, 
            monthlyTripAmountDriverDummy, 
            monthlyTripAmountPassengerDummy, 
            seniorityDriverDummy, 
            seniorityPassengerDummy, 
            recentTripAmountDummy);
    };

    const discard = () => {     
        
        //Cerrar el modal...y setear las rules en 0
           
    };
    

    return(
    <>
        <Head>
        <title>
            Pricing | Fiuumber
        </title>
        </Head>
        <Box            
            component="main"
            sx={{
                flexGrow: 1,
                py: 2
            }}
        >
            <Typography
                textAlign='center'
                sx={{ m: 1 }}
                variant="h2"
                color="#10B981"
            > Fiuumber - Pricing
            </Typography>

            <Stack direction ="column" justifyContent = "space-evenly" spacing={2}>
                <Stack>
                    <Typography
                        sx={{ ml: 4 }}
                        variant="h6"
                        color="#000000"
                    > Trip Info:
                    </Typography> 
                </Stack>
                    <Stack 
                        direction="row" 
                        justifyContent="space-evenly"
                        spacing={4}>
                    
                        <TextField
                            value={time} 
                            onChange={(e) => setTime(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Night Time"
                            variant="outlined"/>

                        <TextField
                            value={duration}  
                            onChange={(e) => setduration(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Duration"
                            variant="outlined"/>    

                        <TextField
                            value={distance} 
                            onChange={(e) => setdistance(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Distance"
                            variant="outlined"/>                         
                    </Stack>
                
                <Stack>
                    <Typography
                        sx={{ ml: 4 }}
                        variant="h6"
                        color="#000000"
                    > Amount of trips in the day:
                    </Typography>
                </Stack>

                    <Stack 
                        direction="row" 
                        justifyContent="space-evenly"
                        spacing={2}>

                        <TextField
                            value={dailyTripAmountDriver}
                            onChange={(e) => setDailyTripAmountDriver(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Driver's"
                            variant="outlined"/>

                        <TextField
                            value={dailyTripAmountPassenger} 
                            onChange={(e) => setDailyTripAmountPassenger(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Passenger's"
                            variant="outlined"/>      
                    </Stack>
                <Stack>
                    <Typography                
                        sx={{ ml: 4 }}
                        variant="h6"
                        color="#000000"
                    > Amount of trips in the month:
                    </Typography>
                </Stack>
                    <Stack 
                        direction="row" 
                        justifyContent="space-evenly"
                        spacing={2}>

                        <TextField
                            value={monthlyTripAmountDriver} 
                            onChange={(e) => setMonthlyTripAmountDriver(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Driver's"
                            variant="outlined"/>

                        <TextField
                            value={monthlyTripAmountPassenger} 
                            onChange={(e) => setMonthlyTripAmountPassenger(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Passenger's"
                            variant="outlined"/>
                    </Stack>
                
                <Stack>
                    <Typography                
                        sx={{ ml: 4 }}
                        variant="h6"
                        color="#000000"
                    > Seniority:
                    </Typography>
                </Stack>
                    <Stack 
                        direction="row" 
                        justifyContent="space-evenly"
                        spacing={2}>

                        <TextField
                            value={seniorityDriver} 
                            onChange={(e) => setSeniorityDriver(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Driver's"
                            variant="outlined"/>

                        <TextField
                            value={seniorityPassenger} 
                            onChange={(e) => setSeniorityPassenger(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Passenger's"
                            variant="outlined"/>

                    </Stack>
                <Stack>
                    <Typography
                        sx={{ ml: 4 }}
                        variant="h6"
                        color="#000000"
                    > Extra Info:
                    </Typography>
                </Stack>
                    <Stack 
                        direction="row" 
                        justifyContent="space-evenly"
                        spacing={4}>

                        <TextField
                            value={recentTripAmount} 
                            onChange={(e) => setRecentTripAmount(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Recent Trip Amount"
                            variant="outlined"/>

                        <TextField
                            value={basePrice} 
                            onChange={(e) => setBasePrice(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Base Price"
                            variant="outlined"/>

                </Stack>
            
                
                <Stack 
                        direction="row" 
                        justifyContent="center  "
                        spacing={4}>
                    <Button
                        color="info"            
                        onClick={() => {setOpenModal2(true)}                
                    }
                        size="large"
                        variant="contained"
                        > Try Out Rules
                    </Button> 
                    </Stack>
             
            </Stack>
            
        
        </Box>
        <Modal
            open={openModal2}
            onClose={() => setOpenModal2(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style2}>            
                <Stack direction ="column" justifyContent = "space-evenly" spacing={3}>
                    <Stack>
                        <Typography
                            sx={[{ ml: 4 }, { mt : 3}]}
                            variant="h3"
                            color="#000000"
                        > Enter dummy values:
                        </Typography> 
                    </Stack>
                    <Stack>
                        <Typography
                            sx={[{ ml: 4 }, { mt : 3}]}
                            variant="h4"
                            color="#000000"
                        > Passenger data:
                        </Typography> 
                    </Stack>

                        <Stack 
                            direction="row" 
                            justifyContent="center"
                            spacing={2}>

                            <TextField
                            value={dailyTripAmountPassengerDummy} 
                            onChange={(e) => setDailyTripAmountPassengerDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Daily Trip Amount"
                            variant="outlined"/>

                              <TextField
                            value={monthlyTripAmountPassengerDummy} 
                            onChange={(e) => setMonthlyTripAmountPassengerDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Monthly Trip Amount"
                            variant="outlined"/>

                            <TextField
                            value={seniorityPassengerDummy} 
                            onChange={(e) => setSeniorityPassengerDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Seniority"
                            variant="outlined"/>
                            
                            <TextField
                            value={recentTripAmountDummy} 
                            onChange={(e) => setRecentTripAmountDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Recent Trip Amount"
                            variant="outlined"/>
                      </Stack>
                    <Stack> 
                        <Typography
                            sx={[{ ml: 4 }, { mt : 3}]}
                            variant="h4"
                            color="#000000"
                        > Driver data:
                        </Typography> 
                    </Stack>
                   
                    <Stack
                    direction="row" 
                            justifyContent="center"
                            spacing={2}>
                  
                  <TextField
                            value={dailyTripAmountDriverDummy} 
                            onChange={(e) => setDailyTripAmountDriverDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Daily Trip Amount"
                            variant="outlined"/>

                              <TextField
                            value={monthlyTripAmountDriverDummy} 
                            onChange={(e) => setMonthlyTripAmountDriverDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Monthly Trip Amount"
                            variant="outlined"/>

                            <TextField
                            value={seniorityDriverDummy} 
                            onChange={(e) => setSeniorityDriverDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Seniority"
                            variant="outlined"/>
                    </Stack>

                            <Button                                
                                color="info"            
                                onClick={() => {setOpenModal1(true),setOpenModal2(false)}}
                                size="large"
                                variant="contained"
                                >Next
                            </Button> 
                        </Stack>
            </Box>
        </Modal>
        <Modal
            open={openModal1}
            onClose={() => setOpenModal1(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>            
                <Stack direction ="column" justifyContent = "space-evenly" spacing={10}>
                    <Stack>
                        <Typography
                            sx={[{ ml: 4 }, { mt : 3}]}
                            variant="h3"
                            color="#000000"
                        > Enter trip:
                        </Typography> 
                    </Stack>
                        <Stack 
                            direction="row" 
                            justifyContent="space-evenly"
                            spacing={1}>
                        
                            <TextField
                                value={origin} 
                                onChange={(e) => setOrigin(e.target.value)}
                                height="1"
                                width="10%"                             
                                placeholder=""
                                label="Origin"
                                variant="outlined"/>

                            <TextField
                                value={destination}  
                                onChange={(e) => setDestination(e.target.value)}
                                height="1"
                                width="10%"                             
                                placeholder=""
                                label="Destination"
                                variant="outlined"/>    

                            <Button                                 
                                color="info"            
                                onClick={() => {testRules()}}
                                size="large"
                                variant="contained"
                                >Test rules
                            </Button> 

                            
                        </Stack>

                        <Stack 
                            direction="row" 
                            justifyContent="center"
                            spacing={2}>
                            
                            <TextField
                                value={calculatedPrice}                                                      
                                label="Calculated trip price"
                                variant="filled" color="success" focused
                                size = "medium"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <Button                                 
                                color="success"            
                                onClick={() => {submitRules("prod")}}
                                size="large"
                                variant="contained"
                                >Apply Rules
                            </Button> 

                            <Button    
                                startIcon = {<DeleteIcon/>}                             
                                color="error"            
                                onClick={() => {discard()}}
                                size="large"
                                variant="contained"
                                >Discard Rules
                            </Button> 

                            
                        </Stack>
                
                </Stack>         
            </Box>
        </Modal>
    </>)
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
