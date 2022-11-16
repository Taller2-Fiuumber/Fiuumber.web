import Head from 'next/head';
import NextLink from 'next/link';
import Router from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography, Text } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { UsersService } from '../../services/UsersServices';
import { useState } from 'react';
import { AuthContext } from '../contexts/auth-context';
import { CONFIG } from '../../config';

const Page = () => {

  const [signInError, setError] = useState("hidden");
  const formik = useFormik({
    initialValues: {

      email: 'demo@devias.io',
      password: 'Password123',
      error_message: ''
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
        const { logIn } = React.useContext(AuthContext);
        logIn(formik.values.email, formik.values.password);
        
      //Código de Ani hardcodeado para que loguee
      // const HEADERS = { headers: { Accept: 'application/json'}};
      // const url = `https://fiuumber-gateway-1.herokuapp.com/api/auth/administrator/login?email=${formik.values.email}&password=${formik.values.password}`;
      // axios.get(url, HEADERS)
      //   .then(function (response) {
      //     if (response.status === 200) {

      //       const userToken = response.data;
      //       console.log("userToken", userToken)
      //       Router
      //       .push('/metrics')
      //     }
      //   })
      //   .catch(function (error) {
      //     formik.values.error_message = "Incorrect email or password"
      //     console.log(error);
      //     if (error && error.response && error.response.status == 401) return null;
      //   });
    }
  });

  return (
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
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
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
              <Grid
                item
                xs={12}
                // md={6}
              >
                <Button
                  color="error"
                  fullWidth
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  startIcon={<GoogleIcon />}
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                or login with an admin email address
              </Typography>
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

              <Typography
                color="red"
              >
                {formik.values.error_message}
              </Typography>

            <Box sx={{ py: 2 }}>
              <Button
                color="secondary"
                disabled={!formik.isValid}
                onClick={formik.Submit }
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
          </form>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Page;