import Head from 'next/head';
import { Box, BoxProps, Container, Grid, Input, Typography, TextField, InputAdornment, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DashboardLayout } from '../components/dashboard-layout';
import { PricesRules } from '../../models/prices';
import {useState} from 'react';



const Page = () => {

    const[time, setTime] = useState("");
    const[duration, setduration] = useState(0);
    const[distance, setdistance] = useState(0);
    const[dailyTripAmountDriver, setDailyTripAmountDriver] = useState(0);
    const[dailyTripAmountPassenger, setDailyTripAmountPassenger] = useState(0);
    const[monthlyTripAmountDriver, setMonthlyTripAmountDriver] = useState(0);
    const[monthlyTripAmountPassenger, setMonthlyTripAmountPassenger] = useState(0);
    const[seniorityDriver, setSeniorityDriver] = useState(0);
    const[seniorityPassenger, setSeniorityPassenger] = useState(0);
    const[recentTripAmount, setRecentTripAmount] = useState(0);
    const[confirmationWaitingTime, setConfirmationWaitingTime] = useState(0);
    const[arrivingWaitingTime, setArrivingWaitingTime] = useState(0);
    
    const submitRules = () => { 

        console.log(time);
    
        // const newRules = new PricesRules( 
        //     time,
        //     duration, 
        //     distance,
        //     dailyTripAmountDriver,
        //     dailyTripAmountPassenger, 
        //     monthlyTripAmountDriver,
        //     monthlyTripAmountPassenger, 
        //     seniorityDriver,
        //     seniorityPassenger, 
        //     recentTripAmount,
        //     confirmationWaitingTime,
        //     arrivingWaitingTime);
    
    
        // applyPricingRules(newRules);
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
                <Typography
                    sx={{ ml: 4 }}
                    variant="h6"
                    color="#000000"
                > Trip Info:
                </Typography> 

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
                        label="Time"
                        variant="outlined"/>

                    <TextField
                        height="1"
                        width="10%"                             
                        placeholder=""
                        label="Duration"
                        variant="outlined"/>    

                    <TextField
                        height="1"
                        width="10%"                             
                        placeholder=""
                        label="Distance"
                        variant="outlined"/>            
                </Stack>
                

                <Typography
                    sx={{ ml: 4 }}
                    variant="h6"
                    color="#000000"
                > Amount of trips in the day:
                </Typography>

                    <Stack 
                        direction="row" 
                        justifyContent="space-evenly"
                        spacing={2}>

                        <TextField
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Driver's"
                            variant="outlined"/>

                        <TextField
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Passenger's"
                            variant="outlined"/>      
                    </Stack>
                
                <Typography                
                    sx={{ ml: 4 }}
                    variant="h6"
                    color="#000000"
                > Amount of trips in the month:
                </Typography>
                    <Stack 
                        direction="row" 
                        justifyContent="space-evenly"
                        spacing={2}>

                        <TextField
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Driver's"
                            variant="outlined"/>

                        <TextField
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Passenger's"
                            variant="outlined"/>
                    </Stack>
                

                <Typography                
                    sx={{ ml: 4 }}
                    variant="h6"
                    color="#000000"
                > Seniority:
                </Typography>

                    <Stack 
                        direction="row" 
                        justifyContent="space-evenly"
                        spacing={2}>

                        <TextField
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Driver's"
                            variant="outlined"/>

                        <TextField
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Passenger's"
                            variant="outlined"/>

                    </Stack>

                <Typography
                    sx={{ ml: 4 }}
                    variant="h6"
                    color="#000000"
                > Extra Info:
                </Typography>

                    <Stack 
                        direction="row" 
                        justifyContent="space-evenly"
                        spacing={4}>

                        <TextField
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Recent Trip Amount"
                            variant="outlined"/>

                        <TextField
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Confirmation Waiting Time"
                            variant="outlined"/>

                        <TextField
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Arriving Waiting Time"
                            variant="outlined"/>

                </Stack>
            
                <Box textAlign='center'>
                
                    <Button
                        startIcon={<DeleteIcon />}            
                        color="info"            
                        onClick={() => {submitRules()}                
                    }
                        size="large"
                        variant="contained"
                        >Apply new pricing rules
                    </Button> 
                </Box>
            </Stack>

        
        </Box>
    </>)
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
