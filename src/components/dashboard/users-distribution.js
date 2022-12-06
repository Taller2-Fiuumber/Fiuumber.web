import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import Person from '@mui/icons-material/Person';
import CarRental from '@mui/icons-material/CarRental';
import { UsersService } from '../../../services/UsersServices';
import { useState, useEffect, Text} from 'react';


export const UsersDistribution = (props) => {
  const theme = useTheme();
  const [amountOfAdmins, setAmountOfAdmins] = useState(0);
  const [amountOfDrivers, setAmountOfDrivers] = useState(0);
  const [amountOfPassengers, setAmountOfPassengers] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    UsersService.getAmountOfAdmins().then((value) => {
      setAmountOfAdmins(value);
    }).catch((error) => {
      console.log(error);
    });
    UsersService.getAmountOfPassenger().then((value) => {
      setAmountOfPassengers(value);
    }).catch((error) => {
      console.log(error);
    });
    UsersService.getAmountOfDriver().then((value) => {
      setAmountOfDrivers(value);
    }).catch((error) => {
      console.log(error);
    });
    setTotalAmount(amountOfAdmins+amountOfDrivers+amountOfPassengers);
  }, [totalAmount, amountOfAdmins, amountOfDrivers, amountOfPassengers]);

  const data = {
    datasets: [
      {
        data: [amountOfAdmins, amountOfPassengers, amountOfDrivers],
        backgroundColor: ['#D4ECDD', '#395B64', '#A5C9CA'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Admins', 'Passengers', 'Drivers']
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
      title: 'Admins',
      value: ((amountOfAdmins/totalAmount)*100).toFixed(1),
      icon: LaptopMacIcon,
      color: '#D4ECDD'
    },
    {
      title: 'Passengers',
      value:((amountOfPassengers/totalAmount)*100).toFixed(1),
      icon: Person,
      color: '#395B64'
    },
    {
      title: 'Drivers',
      value: ((amountOfDrivers/totalAmount)*100).toFixed(1),
      icon: CarRental,
      color: '#A5C9CA'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Users distribution" />
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
