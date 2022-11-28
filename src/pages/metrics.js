import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { SignUpMetrics } from '../components/dashboard/signup-metrics';
import { LoginMetrics } from '../components/dashboard/login-metrics';

import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalPassengers } from '../components/dashboard/total-passengers';
import { TotalDrivers } from '../components/dashboard/total-drivers';
import { TotalAdmins } from '../components/dashboard/total-admins';
import { TotalProfit } from '../components/dashboard/total-profit';
import { UsersDistribution } from '../components/dashboard/users-distribution';
import { UsersBlockStatus } from '../components/dashboard/users-block-status';
import { NewTripsMetrics } from '../components/dashboard/new-trips';
import { TripDurationMetrics } from '../components/dashboard/trip-duration';



import { DashboardLayout } from '../components/dashboard-layout';

const Page = () => (
  <>
    <Head>
      <title>
        Metrics | Fiuumber
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
      > Fiuumber - Metrics
      </Typography>

      <Container maxWidth={false}>
        <Grid
          container
          spacing={5}
        >
          {/* <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid> */}
          {/* <Grid
            item
            xl={4}
            lg={4}
            sm={6}
            xs={12}
          >
            <TotalPassengers />
          </Grid> */}
          {/* <Grid
            item
            xl={4}
            lg={4}
            sm={6}
            xs={12}
          >
            <TotalDrivers />
          </Grid> */}
          {/* <Grid
            item
            xl={4}
            lg={4}
            sm={6}
            xs={12}
          >
            <TotalAdmins />
          </Grid> */}
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <TasksProgress />
          </Grid> */}
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            {/* <TotalProfit sx={{ height: '100%' }} /> */}
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LoginMetrics />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <SignUpMetrics />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <UsersDistribution sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <UsersBlockStatus sx={{ height: '100%' }} />
          </Grid>
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid> */}
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <NewTripsMetrics />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <TripDurationMetrics />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
