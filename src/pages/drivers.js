import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DriverListResults } from '../components/driver/driver-list-results';
import { DriverListToolbar } from '../components/driver/driver-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { drivers } from '../__mocks__/drivers';

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
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <DriverListToolbar />
        <Box sx={{ mt: 3 }}>
          <DriverListResults drivers={drivers} />
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
