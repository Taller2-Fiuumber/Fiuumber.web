import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import Check from '@mui/icons-material/Check';
import Block from '@mui/icons-material/Block';
import { useState, useEffect, Text} from 'react';
import { TripsServices } from '../../../services/TripsServices';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const TripsStatus = (props) => {
  const theme = useTheme();

  const [totalAmountOfTrips, setTotalAmountOfTrips] = useState(0);
  const [amountOfFinishedTrips, setAmountOfFinishedTrips] = useState(0);
  const [amountOfCanceledTrips, setAmountOfCanceledTrips] = useState(0);
  const [noData, setNoData] = useState(true);

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const type = urlParams.get('type');

  useEffect(() => {
 
    TripsServices.getAmountOfTrips(id, type).then((value) => {
      

      if (value != undefined){
        if (value == false) {
            setNoData(true);
            setTotalAmountOfTrips(0);
        } else {
          setTotalAmountOfTrips(value);
            setNoData(false);
        }
      }
    }).catch((error) => {
      console.log(error);
    });

    
    TripsServices.getFinishedTripsById(id, type).then((value) => {

      if (value != undefined){
        if (value == false) {
            setNoData(true);
            setAmountOfFinishedTrips(0);
        } else {
          setAmountOfFinishedTrips(value);
            setNoData(false);
        }
      }
      
    }).catch((error) => {
      console.log(error);
    });

    TripsServices.getCanceledTripsById(id, type).then((value) => {
      
      if (value != undefined){
        if (value == false) {
            setNoData(true);
            setAmountOfCanceledTrips(0);
        } else {
          setAmountOfCanceledTrips(value);
          setNoData(false);
        }
      }
    }).catch((error) => {
      console.log(error);
    });

  }, [noData]);


  const data = {
    datasets: [
      {
        data: [amountOfFinishedTrips, amountOfCanceledTrips ],
        backgroundColor: ['#395B64', '#A5C9CA'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Finished', 'Canceled']
  };
  

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };


  const userTypes = [
    {
      title: 'Finished',
      value: ((amountOfFinishedTrips/totalAmountOfTrips)*100).toFixed(1),
      icon: Block,
      color: '#D4ECDD'
    },
    {
      title: 'Canceled',
      value: ((amountOfCanceledTrips/totalAmountOfTrips)*100).toFixed(1),
      icon: Check,
      color: '#395B64'
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Finished vs Canceled Trips Status" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        > 
        {(noData) &&
        <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This passenger didn't make any trips yet
        </Alert>  
        }
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {userTypes.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
