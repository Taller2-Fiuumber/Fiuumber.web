import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import Check from '@mui/icons-material/Check';
import Block from '@mui/icons-material/Block';
import { useState, useEffect, Text} from 'react';
import { UsersService } from '../../../services/UsersServices';


export const UsersBlockStatus = (props) => {
  const theme = useTheme();

  const [totalAmountOfBlockedUsers, setTotalAmountOfBlockedUsers] = useState(0);
  const [amountOfDrivers, setAmountOfDrivers] = useState(0);
  const [amountOfPassengers, setAmountOfPassengers] = useState(0);
  // const [totalAmountOfUsers, setTotalAmountOfUsers] = useState(0);

  useEffect(() => {
   
    UsersService.getAmountOfPassenger().then((value) => {
      if (value != undefined){
        setAmountOfPassengers(value);
      }
    }).catch((error) => {
      console.log(error);
    });
    UsersService.getAmountOfDriver().then((value) => {
      if (value != undefined){
        setAmountOfDrivers(value);
      }
    }).catch((error) => {
      console.log(error);
    });
    UsersService.getAmountOfBlockedUsers().then((value) => {
      if (value != undefined){
        setTotalAmountOfBlockedUsers(value);
      }
      console.log("PASE POR ACA");

    }).catch((error) => {
      console.log(error);
    });
    console.log(totalAmountOfBlockedUsers);

  }, [totalAmountOfBlockedUsers, amountOfDrivers, amountOfPassengers]);


  const data = {
    datasets: [
      {
        data: [totalAmountOfBlockedUsers, (amountOfDrivers+amountOfPassengers)-totalAmountOfBlockedUsers],
        backgroundColor: ['#395B64', '#A5C9CA'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Blocked', 'Not blocked']
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
      title: 'Blocked',
      value: ((totalAmountOfBlockedUsers/(amountOfDrivers+amountOfPassengers))*100).toFixed(1),
      icon: Block,
      color: '#D4ECDD'
    },
    {
      title: 'Not blocked',
      value: (100 - (totalAmountOfBlockedUsers/(amountOfDrivers+amountOfPassengers))*100).toFixed(1),
      icon: Check,
      color: '#395B64'
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Users block status" />
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
