import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import Router from 'next/router';
import { UsersService } from '../../services/UsersServices';
import { useEffect, useRef, useState } from 'react';



const Page = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const [passenger, setPassenger] = useState(null);
  useEffect(() => {
    UsersService.getPassenger(id).then((value) => { 
      // console.log(value);
      setPassenger(value);
    }).catch((error) => {
      console.log(error);
    });
    
  }, [setPassenger]);
  console.log("Console log account:");
  console.log(passenger);
  return(
    <>
      <Head>
        <title>
          Account | Fiuumber
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
        > Fiuumber - Account
        </Typography>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
