import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
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
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 3 }}>
          {/* <CustomerListResults customers={customers} /> */}
                 
          <CustomerListResults customers={fetchUsers()} />

        </Box>
      </Container>
    </Box>
  </>
);


const fetchUsers = () => {
  const users = [];
  console.log("Estoy por getear los users");
  const passengerId = 1;
  for (let index = 0; index < 4; index++) {
    UsersService.getUser(passengerId).then((value) => {
      users[index] = value;
    })
    //users[index] = UsersService.getUser(passengerId);
    passengerId++;
  } 
  console.log(users);
  return users
}



Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
