import Head from 'next/head';
import { Box, Container, Typography} from '@mui/material';
import { PassengerListResults } from '../components/passenger/passenger-list-results';
import { DashboardLayout } from '../components/dashboard-layout';

import { UsersService } from '../../services/UsersServices';


const Page = () => (
  <>
    <Head>
      <title>
        Passengers | Fiuumber
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
      > Fiuumber - Passengers
      </Typography>

      <Container maxWidth={false}>
        <Box sx={{ mt: 3 }}>
          <PassengerListResults/>
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
