import Head from 'next/head';
import { Box, Container, Grid, Typography , Stack} from '@mui/material';
import { SignUpMetrics } from '../components/dashboard/signup-metrics';
import { LoginMetrics } from '../components/dashboard/login-metrics';

import { UsersDistribution } from '../components/dashboard/users-distribution';
import { UsersBlockStatus } from '../components/dashboard/users-block-status';
import { NewTripsMetrics } from '../components/dashboard/new-trips';
import { TripDurationMetrics } from '../components/dashboard/trip-duration';


import { DashboardLayout } from '../components/dashboard-layout';
import { PaymentsMetrics } from '../components/dashboard/ payment-metrics';
import { CollectionMetrics } from '../components/dashboard/collection-metrics';
import { useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    // color:
    //   theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Page = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showTripMetrics, setShowTripMetrics] = useState(false);
  const [showPaymentsMetrics, setShowPaymentsMetrics] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleTripMetrics = () => {
    setShowTripMetrics(true);
    setShowPaymentsMetrics(false);
    setAnchorEl(null);
  };
  const handlePaymentMetrics = () => {
    setShowTripMetrics(false);
    setShowPaymentsMetrics(true);
    setAnchorEl(null);
  };
  const handleHide = () => {
    setShowTripMetrics(false);
    setShowPaymentsMetrics(false);
    setAnchorEl(null);
  };

return(
  <>
    <Head>
      <title>
        Metrics | Fiuumber
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 0,
        py: 2
      }}
    >
      <Typography
        sx={{ mt: 1 }}
        variant="h2"
        color="#10B981"
        textAlign="center"
      > Fiuumber - Metrics
      </Typography>

      <Container maxWidth={false}>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          >
          <Grid
            item
            lg={11}
            md={12}
            xl={11}
            xs={12}
           >
            <Typography
              sx={{ m: 2 }}
              variant="h5"
              color="#000000"
              textAlign="center"
            > Users Metrics
            </Typography>

            <LoginMetrics />
          </Grid>
          <Grid
            item
            lg={11}
            md={12}
            xl={11}
            xs={12}
            >
            <SignUpMetrics />
          </Grid>
          <Grid
            item
            lg={5}
            md={6}
            xl={4}
            xs={12}
            >
            <UsersBlockStatus sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={5}
            md={6}
            xl={4}
            xs={12}
            >
            <UsersDistribution sx={{ height: '100%' }} />
          </Grid>

          <Grid
            item
            lg={5}
            md={6}
            xl={4}
            xs={12}
            flexDirection="row"
            > 
             <Stack
                direction="row" 
                justifyContent="space-between"
                spacing={3}>

                <Typography
                    sx={{ m: 2 }}
                    variant="h5"
                    color="#000000"
                    textAlign="left"
                  > More Metrics
                </Typography>

                <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                 More metrics
                </Button>
              
                <StyledMenu
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleTripMetrics} disableRipple>
                    Trips metrics
                  </MenuItem>
                  <MenuItem onClick={handlePaymentMetrics} disableRipple>
                    Payments metrics
                  </MenuItem>
                  { (showTripMetrics||showPaymentsMetrics) &&
                    <><Divider sx={{ my: 0.5 }} />
                      <MenuItem onClick={handleHide} disableRipple>
                            Hide metrics
                      </MenuItem>
                    </>
                  }
                </StyledMenu> 
              </Stack>

          </Grid>
         
          {(showTripMetrics) && 
          <><Grid
              item
              lg={11}
              md={12}
              xl={11}
              xs={12}
              >
              <Typography
                sx={{ m: 2 }}
                variant="h5"
                color="#000000"
                textAlign="center"
              > Trips Metrics
              </Typography>
              <NewTripsMetrics />
            </Grid>
            <Grid
              item
              lg={11}
              md={12}
              xl={11}
              xs={12}
              >
             <TripDurationMetrics />
            </Grid>
          </>}
          {(showPaymentsMetrics) && 
            <>
              <Grid
                item
                lg={11}
                md={12}
                xl={11}
                xs={12}
                >
                <Typography
                  sx={{ m: 2 }}
                  variant="h5"
                  color="#000000"
                  textAlign="center"
                > Payments Metrics
                </Typography>
                <PaymentsMetrics />
              </Grid>
              <Grid
                item
                lg={11}
                md={12}
                xl={11}
                xs={12}
                >
                  <CollectionMetrics />
              </Grid>
            </>
          }
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