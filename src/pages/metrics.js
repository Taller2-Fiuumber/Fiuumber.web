import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { SignUpMetrics } from '../components/dashboard/signup-metrics';
import { PasswordRecoveryMetrics } from '../components/dashboard/password-recovery-metrics';
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
        sx={{ mt: 1 }}
        variant="h2"
        color="#10B981"//"#395B64"
        textAlign="center"
      > Fiuumber - Metrics
      </Typography>

      <Container maxWidth={false}>
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
            <Typography
              sx={{ m: 2 }}
              variant="h5"
              color="#000000"
              textAlign="center"
            > Users Metrics
            </Typography>

            <LoginMetrics />
          </Grid>
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
            <SignUpMetrics />
          </Grid>
          {/* <Grid
            item
            // lg={7}
            // md={12}
            // xl={8}
            // xs={12}
            lg={11}
            md={12}
            xl={11}
            xs={12}
          >
            <PasswordRecoveryMetrics />
          </Grid> */}
          <Grid
            item
            lg={5}
            md={6}
            xl={4}
            xs={12}
          >
            <UsersBlockStatus sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={5}
            md={6}
            xl={4}
            xs={12}
          >
            <UsersDistribution sx={{ height: '100%' }} />
          </Grid>

          <Grid
            item
            lg={11}
            md={12}
            xl={11}
            xs={12}
          >
              <Typography
              sx={{ m: 2 }}
              variant="h5"
              color="#000000"
              textAlign="center"
            > Trips Metrics
            </Typography>
            <NewTripsMetrics />
          </Grid>
          <Grid
            item
            lg={11}
            md={12}
            xl={11}
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
