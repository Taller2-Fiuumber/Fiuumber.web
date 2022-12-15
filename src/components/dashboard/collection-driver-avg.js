import { Bar, Line } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import {useState, useEffect} from 'react';
import { TripsServices } from '../../../services/TripsServices';

export const CollectionDriverAvgMetrics = (props) => {
  const theme = useTheme();

  const[time, setTime] = useState(7);
  const[driverAvgData, setDriverAvgData] = useState([]);
  const [labels, changeLabels] = useState([]);

  const changeTimeSelection = (numberOfDays) => {
    
    if (numberOfDays == "Last 30 days") {
      setTime(30);
    }else if(numberOfDays == "Last 14 days"){
        setTime(14);
    }else{
        setTime(7);
    }
  };

//   useEffect(() => {
//    TripsServices.getNewTripsPerRangeMetrics(time).then((value) => {
//       if (value != undefined){
//         changeLabels(value[0])
//         setNewTripsData(value[1]);

//       }
//     }).catch((error) => {
//       console.log(error);
//     });
 
// }, [time]);

  const data = {
    datasets: [
      {
        backgroundColor: '#A5C9CA',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: driverAvgData,
        label: 'Collected Money',
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
            <MenuItem value={"Last 14 days"}>Last 14 days</MenuItem>
            <MenuItem value={"Last 30 days"}>Last 30 days</MenuItem>
          </Select>
      </FormControl>
        )}
        title="Drivers Average Collection"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Line
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
   
    </Card>
  );
};
