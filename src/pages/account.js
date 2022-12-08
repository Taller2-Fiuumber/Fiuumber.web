import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';




const Page = () => {
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
           sx={{ mt: 1 }}
           variant="h2"
           color="#10B981"//"#395B64"
           textAlign="center"
        > Fiuumber - Account
        </Typography>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              md={12}
              xs={12}
            >
              <AccountProfileDetails  />
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
