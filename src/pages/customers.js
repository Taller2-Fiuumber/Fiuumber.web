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
  UsersService.getUsers().then((value) => { //aca surge el problema del doble print
    //console.log(value);
    const passengers = [];
    value.forEach(passenger => {
      passengers.push({
        id: passenger.id,
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        username: passenger.username,
        adress: passenger.adress,
      }
      )
    })
    console.log(passengers);
    return passengers;
  })
  return []
}



Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
