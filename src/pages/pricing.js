import Head from 'next/head';
import { Box, BoxProps, Container, Grid, Input, Typography, TextField, InputAdornment, Button, Stack, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DashboardLayout } from '../components/dashboard-layout';
import { PricesRules } from '../../models/prices';
import {useState} from 'react';
import { TripsServices} from '../../services/TripsServices';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
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
    width: 1000,
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

const Page = () => {
    //Constantes de sistema
    const[openModal1, setOpenModal1] = useState(false);
    const[openModal2, setOpenModal2] = useState(false);  
    const[openModal3, setOpenModal3] = useState(false);    
  

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

    //Datos dummy para testeo
    const[dailyTripAmountDriverDummy, setDailyTripAmountDriverDummy] = useState("");
    const[dailyTripAmountPassengerDummy, setDailyTripAmountPassengerDummy] = useState("");
    const[monthlyTripAmountDriverDummy, setMonthlyTripAmountDriverDummy] = useState("");
    const[monthlyTripAmountPassengerDummy, setMonthlyTripAmountPassengerDummy] = useState("");
    const[seniorityDriverDummy, setSeniorityDriverDummy] = useState("");
    const[seniorityPassengerDummy, setSeniorityPassengerDummy] = useState("");
    const[recentTripAmountDummy, setRecentTripAmountDummy] = useState("");

    //Variables de testeo
    const[tripDuration, setTripDuration] = useState("");
    const[tripDistance, setTripDistance] = useState("");
    const[calculatedPrice, setCalculatedPrice] = useState("");

    
    
    
    const submitRules = async () => { 
    
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
            recentTripAmount,
            basePrice);
            
        if(await TripsServices.applyPricingRules(newRules)){
            setOpenModal3(true)
        };
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



        const result = TripsServices.testPricingRules(newRules, 
            dailyTripAmountDriverDummy,
            dailyTripAmountPassengerDummy, 
            monthlyTripAmountDriverDummy, 
            monthlyTripAmountPassengerDummy, 
            seniorityDriverDummy, 
            seniorityPassengerDummy, 
            recentTripAmountDummy,
            tripDuration,
            tripDistance);

        setCalculatedPrice(result);
    };

    const discard = () => {     
        
        //Cerrar el modal...y setear las rules en 0
        setOpenModal1(false);

        setTime("");
        setduration("");
        setdistance("");
        setDailyTripAmountDriver("");
        setDailyTripAmountPassenger("");
        setMonthlyTripAmountDriver("");
        setMonthlyTripAmountPassenger("");
        setSeniorityDriver("");
        setSeniorityPassenger("");
        setRecentTripAmount("");
        setBasePrice("");
        
        //Los Dummy los dejo cargados
        setTripDuration("");
        setTripDistance("");           
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
                            required
                            value={time} 
                            onChange={(e) => setTime(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Night Time"
                            variant="outlined"/>

                        <TextField 
                            required
                            value={duration}  
                            onChange={(e) => setduration(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Duration"
                            variant="outlined"/>    

                        <TextField 
                            required
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
                            required
                            value={dailyTripAmountDriver}
                            onChange={(e) => setDailyTripAmountDriver(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Driver's"
                            variant="outlined"/>

                        <TextField 
                            required
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
                            required
                            value={monthlyTripAmountDriver} 
                            onChange={(e) => setMonthlyTripAmountDriver(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Driver's"
                            variant="outlined"/>

                        <TextField 
                            required
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
                            required
                            value={seniorityDriver} 
                            onChange={(e) => setSeniorityDriver(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Driver's"
                            variant="outlined"/>

                        <TextField 
                            required
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
                            required
                            value={recentTripAmount} 
                            onChange={(e) => setRecentTripAmount(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Recent Trip Amount"
                            variant="outlined"/>

                        <TextField 
                            required
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
                                required
                            value={dailyTripAmountPassengerDummy} 
                            onChange={(e) => setDailyTripAmountPassengerDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Daily Trip Amount"
                            variant="outlined"/>

                            <TextField 
                            required
                            value={monthlyTripAmountPassengerDummy} 
                            onChange={(e) => setMonthlyTripAmountPassengerDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Monthly Trip Amount"
                            variant="outlined"/>

                            <TextField 
                            required
                            value={seniorityPassengerDummy} 
                            onChange={(e) => setSeniorityPassengerDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Seniority"
                            variant="outlined"/>
                            
                            <TextField 
                            required
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
                            required
                            value={dailyTripAmountDriverDummy} 
                            onChange={(e) => setDailyTripAmountDriverDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Daily Trip Amount"
                            variant="outlined"/>

                            <TextField 
                            required
                            value={monthlyTripAmountDriverDummy} 
                            onChange={(e) => setMonthlyTripAmountDriverDummy(e.target.value)}
                            height="1"
                            width="10%"                             
                            placeholder=""
                            label="Monthly Trip Amount"
                            variant="outlined"/>

                            <TextField 
                            required
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

                        {/* <Stack width = "30%"
                            // label="Origen"
                            // placeholder="Origen"
                            // value={origin}
                            // onChange={(e) => setOrigin(e.target.value)}
                        
                        >
                            <GooglePlacesAutocomplete
                               
                                apiKey="AIzaSyANbv3JEv2HV3r4Sj9j7Y5yrX3KYQcSmew"    
                                                                               
                                
                                // selectProps={{
                                    
                                //     styles: {
                                //         width : "100%",
                                //         input: (provided) => {
                                //             console.log(Input)
                                //             // ...provided,
                                //             // color: 'blue',
                                        
                                //         // option: (provided) => ({
                                //         //     ...provided,
                                //         //     color: 'blue',
                                //         // }),
                                //         // singleValue: (provided) => ({
                                //         //     ...provided,
                                //         //     color: 'blue',
                                //         },
                                //     },
                                //   }}
                                />

                        </Stack>
                        <Stack width = "30%">
                            <GooglePlacesAutocomplete                                
                                apiKey="AIzaSyANbv3JEv2HV3r4Sj9j7Y5yrX3KYQcSmew"                                
                                />
                        </Stack> */}
                       
                            <TextField 
                                required
                                value={tripDistance} 
                                onChange={(e) => setTripDistance(e.target.value)}
                                height="1"
                                width="10%"                             
                                placeholder=""
                                label="Trip Distance"
                                variant="outlined"/>

                            <TextField 
                                required
                                value={tripDuration}  
                                onChange={(e) => setTripDuration(e.target.value)}
                                height="1"
                                width="10%"                             
                                placeholder=""
                                label="Trip Duration"
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
                                required
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
                                onClick={() => {submitRules()}}
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
        <Modal
            open={openModal3}
            onClose={() => setOpenModal3(false)}
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
                        >  The rules where applied successfully!
                        </Typography> 
                    </Stack>
                    <Button                                
                        color="error"            
                        onClick={() => {setOpenModal1(false),setOpenModal2(false), setOpenModal3(false)}}
                        size="medium"
                        variant="contained"
                        >Ok
                    </Button> 
                       
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
