import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import {useState, useEffect} from 'react';
import { UsersService } from '../../../services/UsersServices';

export const SignUpMetrics = (props) => {
  const theme = useTheme();


  const[time, setTime] = useState(7);
  
  const currentDate = new Date(Date.now());
  const currentDateString = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`

  const [user_password_data, setUserPasswordData] = useState([]); // datos iniciales 7 days
  const [federated_identity_data, setFederatedIdentityData] = useState([]); // datos iniciales 7 days
  const [labels, changeLabels] = useState([]);



  const changeTimeSelection = (numberOfDays) => {
  
    if (numberOfDays == "Last 30 days") {
      setTime(30);
    }else {
      setTime(7);
    }
    
  };

  useEffect(() => {
      UsersService.getLogInMetricsGoogle(currentDateString, time).then((value) => {
        if (value != undefined){
          changeLabels(value[0])
          setFederatedIdentityData(value[1]);

        }
      }).catch((error) => {
        console.log(error);
      });

      UsersService.getLogInMetrics(currentDateString, time).then((value) => {
        if (value != undefined){
          changeLabels(value[0])
          setUserPasswordData(value[1]);
        }
      }).catch((error) => {
        console.log(error);
      });
    
  }, [time]);

  const data = {
    datasets: [
      {
        backgroundColor: '#A5C9CA',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: user_password_data,
        label: 'User & password',
        maxBarThickness: 10
      },
      {
        backgroundColor: '#395B64',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: federated_identity_data,
        label: 'Federated Identity',
        maxBarThickness: 10
      }
    ],
    labels: labels
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
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

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel >Period</InputLabel>
          <Select
            value={`Last ${time} days`} 
            onChange={(e) => changeTimeSelection(e.target.value)}
            label="Period"
          >
            <MenuItem value={"Last 7 days"}>Last 7 days</MenuItem>
            <MenuItem value={"Last 30 days"}>Last 30 days</MenuItem>
          </Select>
      </FormControl>
        )}
        title="SignUp Metrics"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    
    </Card>
  );
};
