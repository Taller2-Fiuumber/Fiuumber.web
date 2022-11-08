import Head from 'next/head';
import { Box, Container , Typography} from '@mui/material';
import { AdminListResults } from '../components/admin/admin-list-results';
import { AdminListToolbar } from '../components/admin/admin-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { admins } from '../__mocks__/admins';

const Page = () => (
  <>
    <Head>
      <title>
        Admins | Fiuumber
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
        //color="#10B9D7" 
      > Fiuumber - Admins
      </Typography>

      <Container maxWidth={false}>
        <AdminListToolbar />
        <Box sx={{ mt: 3 }}>
          <AdminListResults admins={admins} />
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
