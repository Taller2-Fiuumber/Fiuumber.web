import Head from 'next/head';
import { Box, Container } from '@mui/material';
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
        py: 8
      }}
    >
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
