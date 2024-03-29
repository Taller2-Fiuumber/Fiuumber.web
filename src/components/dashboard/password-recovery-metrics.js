import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import {useState} from 'react';

export const PasswordRecoveryMetrics = (props) => {
  const theme = useTheme();

  const[time, setTime] = useState("Week");

  const data = {
    datasets: [
     {
        backgroundColor: '#395B64',
        barPercentage: 1,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 1,
        data: [11, 20, 12, 29, 30, 25, 13],
        label: 'User & password',
        maxBarThickness: 10
      }
    ],
    labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug']
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
            onChange={(e) => setTime(e.target.value)}
            label="Period"
          >
            <MenuItem value={"Day"}>Day</MenuItem>
            <MenuItem value={"Week"}>Week</MenuItem>
            <MenuItem value={"Month"}>Month</MenuItem>
          </Select>
      </FormControl>
        )}
        title="Password Recovery Metrics"
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
