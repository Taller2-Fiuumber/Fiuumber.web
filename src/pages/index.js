import Head from 'next/head';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography ,useTheme} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { UsersService } from '../../services/UsersServices';
import { useState } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { auth, ENABLE_AUTH } from '../lib/auth';

const Login = () => {
  const theme = useTheme();
  const [signInError, setError] = useState("hidden");
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
    }),
    onSubmit: () => {
      UsersService.validateLogin(formik.values.email, formik.values.password).then((login) => { 
        if(login == null){
          Router
          .push('.')
          formik.values.email = '';
          formik.values.password = '';
          setError("show");
        } else {
          const token = login.token;
          const admin = login.admin;
          setError("hidden");
          Router
          .push('/metrics')
          .catch(console.error);          
        }
      }).catch((error) => {
        console.log(error);
      });


import { Admin } from '../../models/admin';
import { currentAdmin, currentUserToken } from '../contexts/currentAdmin';





const Page = () => {
  //const [error, setError] = useState('');
  useEffect(() => {     
    //Nuestro primer test unitario!!!
    // const adminTest = new Admin( 42, 'xd', 'xdxd', 'xdxdxd', 'xdxdxdxdxdxd');
    // const userToken = new UserToken(adminTest, '563ytvtfvhewrqwevuriu');
    // localStorage.setItem('userToken', JSON.stringify(userToken));
    // localStorage.setItem('userToken', null);   
    
    


    const aux  = JSON.parse(localStorage.getItem('userToken'));

   

    
    if (aux  == null) {
      Router.push('/logIn').catch(console.error);
    }
    else{      
      currentUserToken.setUserToken(aux.user, aux.token);
      const admin = currentUserToken.user;
      currentAdmin.setAdmin(admin.adminId, admin.email, admin.firstName, admin.lastName, admin.password);      
      Router.push('/metrics').catch(console.error);

    }
  }, []);

  return(
    <>
      <Head>
        <title>Login | Fiuumber</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
          //backgroundColor:'#D4ECDD', //'#26a69a',
          // '&:hover': {
          //   backgroundColor: '#A5C9CA',
          //   opacity: [0.9, 0.8, 0.7],
          // },
  
        }}
        
      >
        <Container maxWidth="sm" >
          <form onSubmit={formik.handleSubmit}>
          <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          padding ="5px" 
         // border= "5px solid grey"
        >
            <Box sx={{ my: 3 }}>
            <Typography
                color="textSecondary"
                variant="h2"
              >
                Fiuumber admins
              </Typography>
              <Typography
                color="textSecondary"
                variant="h4"
              >
                Login
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >
             
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Admin Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="secondary"
                disabled={formik.isSubmitting && !formik.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
              <Typography
                align="center"
                color="red"
                variant="body1"
                visibility={signInError}
              >
                Error! Wrong email or password
              </Typography>
            </Box>
            </Grid>
          </form>
          
        </Container>
      </Box>

    </>
)};


export default Page;