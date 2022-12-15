import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import Check from '@mui/icons-material/Check';
import Block from '@mui/icons-material/Block';
import { useState, useEffect, Text} from 'react';
import { TripsServices } from '../../../services/TripsServices';



export const TripsStatus = (props) => {
  const theme = useTheme();

  const [amountOfFinishedTrips, setAmountOfFinishedTrips] = useState(0);
  const [amountOfCanceledTrips, setAmountOfCanceledTrips] = useState(0);

  const [id, setId] = useState('');
  const [typeWindow, setTypeWindow] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setId(urlParams.get('id'));
    setTypeWindow(urlParams.get('type'));
    

    TripsServices.getFinishedTripsById(id, typeWindow).then((value) => {

      if (value != undefined){
          setAmountOfFinishedTrips(value);
        }
    }).catch((error) => {
      console.log(error);
    });

    TripsServices.getCanceledTripsById(id, typeWindow).then((value) => {
      
      if (value != undefined){
          setAmountOfCanceledTrips(value);
        }
    }).catch((error) => {
      console.log(error);
    });

  }, [amountOfCanceledTrips, amountOfFinishedTrips]);


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
      value: ((amountOfFinishedTrips/(amountOfFinishedTrips+amountOfCanceledTrips))*100).toFixed(1),
      icon: Check,
      color: '#D4ECDD'
    },
    {
      title: 'Canceled',
      value: ((amountOfCanceledTrips/(amountOfFinishedTrips+amountOfCanceledTrips))*100).toFixed(1),
      icon: Block,
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
