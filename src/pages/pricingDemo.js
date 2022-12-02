import Head from 'next/head';
import { Box, BoxProps, Container, Grid, Input, Typography, TextField, InputAdornment, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DashboardLayout } from '../components/dashboard-layout';
import { PricesRules } from '../../models/prices';
import {useState} from 'react';
import { TripServices} from '../../services/TripServices';
import { Router } from 'next/router';




const Page = () => {

    const[origin, setOrigin] = useState("");
    const[destination, setDestination] = useState("");
    const[calculatedPrice, setCalculatedPrice] = useState("");
    
    
    const testRules = (priceRules) => { 
        console.log(origin);
        console.log(destination);
        setCalculatedPrice("$999");

    
    };

    const submitRules = (type) => { 
        //newRules seria el objeto con las reglas
        //TripServices.applyPricingRules(newRules, type);
        //Router.push("/pricing"); 
    };
    

    const discard = () => {        
        Router.push("/pricing");    
    };
    

    return(
    <>
        <Head>
        <title>
            Pricing Rules Testing | Fiuumber
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
            > Fiuumber -  Pricing Rules Testing
            </Typography>

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
    </>)
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
