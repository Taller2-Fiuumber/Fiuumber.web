import Head from 'next/head';
import { Box, Container , Typography} from '@mui/material';
import { AdminListResults } from '../components/admin/admin-list-results';
import { DashboardLayout } from '../components/dashboard-layout';


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
        sx={{ mt: 1 }}
        variant="h2"
        color="#10B981"//"#395B64"
        textAlign="center" 
      > Fiuumber - Admins
      </Typography>

      <Container maxWidth={false}>
        <Box sx={{ mt: 3 }}>
          <AdminListResults />
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
