import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import {useState} from 'react';

export const LoginMetrics = (props) => {
  const theme = useTheme();

  const[time, setTime] = useState("Last 7 days");

  const [user_password_data, setUserPasswordData] = useState([18, 5, 19, 27, 29, 19, 20]); // datos iniciales 7 days
  const [federated_identity_data, setFederatedIdentityData] = useState([11, 20, 12, 29, 30, 25, 13]); // datos iniciales 30 days
  const [labels, changeLabels] = useState(['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug']);
  const changeTimeSelection = (value) => {
    if (value == "Last 30 days") { // quiero cambiar a 30 days
      // basicamente hacer un get y reemplazar ahi, esto deberia hacerse en un use effect
      setUserPasswordData([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      setFederatedIdentityData([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      changeLabels(['1 Jul', '2 Jul', '3 Jul', '4 Jul', '5 Jul', '6 Jul', '7 Jul', '8 jul', '9 jul', '10 jul'])
    } else {
      setUserPasswordData([18, 5, 19, 27, 29, 19, 20]);
      setFederatedIdentityData([11, 20, 12, 29, 30, 25, 13]);
      changeLabels(['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug'])
    }
    
    setTime(value);
  };

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
            value={time} 
            onChange={(e) => changeTimeSelection(e.target.value)}
            label="Period"
          >
            <MenuItem value={"Last 7 days"}>Last 7 days</MenuItem>
            <MenuItem value={"Last 30 days"}>Last 30 days</MenuItem>
            {/* <MenuItem value={"Month"}>Month</MenuItem> */}
          </Select>
      </FormControl>
        )}
        title="Number of Logins"
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
