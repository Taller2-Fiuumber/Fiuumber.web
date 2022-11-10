import Head from 'next/head';
import { Box, BoxProps, Container, Grid, Input, Typography, TextField, InputAdornment } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { PriceRules } from '../components/price-rules';
import { DashboardLayout } from '../components/dashboard-layout';



const Page = () => (
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
            sx={{ m: 1 }}
            variant="h2"
            color="#10B981"
        > Fiuumber - Pricing
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', maxWidth: 1000 }} >            
                       
            <Typography
                width="45%"  
                > Precio x distancia a recorrer:
            </Typography>   
        
            <TextField
                width="10%"                             
                placeholder="$"
                variant="outlined"
            />           
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', maxWidth: 1000 }} >            
                       
            <Typography
                width="45%"  
                > Precio x minuto de viaje (duración):
            </Typography>   
        
            <TextField
                width="10%"                             
                placeholder="$"
                variant="outlined"
            />           
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', maxWidth: 1000 }} >            
                       
            <Typography
                width="45%"  
                > Precio x Horario:
            </Typography>   
        
            <TextField
                width="10%"                             
                placeholder="$"
                variant="outlined"
            />           
        </Box>


        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', maxWidth: 1000 }} >            
                       
            <Typography
                width="45%"  
                > Tarifa para conductores con más de x viajes al mes:
            </Typography>   
        
            <TextField
                width="10%"                             
                placeholder="$"
                variant="outlined"
            />           
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', maxWidth: 1000 }} >            
                       
            <Typography
                width="45%"  
                > Tarifa para conductores con más de x antigüedad:
            </Typography>   
        
            <TextField
                width="10%"                             
                placeholder="$"
                variant="outlined"
            />           
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', maxWidth: 1000 }} >            
                       
            <Typography
                width="45%"  
                > Tarifa para pasajeros pobres (saldo negativo):
            </Typography>   
        
            <TextField
                width="10%"                             
                placeholder="$"
                variant="outlined"
            />           
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', maxWidth: 1000 }} >            
                       
            <Typography
                width="45%"  
                > Precio x distancia a recorrer:
            </Typography>   
        
            <TextField
                width="10%"                             
                placeholder="$"
                variant="outlined"
            />           
        </Box>

      
      <PriceRules/>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
