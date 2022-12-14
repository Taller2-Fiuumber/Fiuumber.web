import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DriverListResults } from '../components/driver/driver-list-results';
import { DashboardLayout } from '../components/dashboard-layout';


const Page = () => (
  <>
    <Head>
      <title>
        Drivers | Fiuumber
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
        color="#10B981"
        textAlign="center"
      > Fiuumber - Drivers
      </Typography>


      <Container maxWidth={false}>
        <Box sx={{ mt: 3 }}>
          <DriverListResults/>         
        </Box>
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
