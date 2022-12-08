import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, Select, MenuItem, InputLabel, FormControl} from '@mui/material';
import {useState, useEffect} from 'react';
import { TripsServices } from '../../../services/TripsServices';


export const UserCalificationMetrics = (props) => {
  const theme = useTheme();

  const labels = [1, 2, 3, 4, 5]; 
  const[calificationsData, setCalificationsData] = useState([]);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const type = urlParams.get('type');

  useEffect(() => {
        TripsServices.getCalificationsById(id, type).then((value) => {
            if (value != undefined){
                if (value == false) {
                    setCalificationsData([0,0,0,0,0]);
                } else {
                    setCalificationsData(value);
                }
            }
          }).catch((error) => {
            console.log(error);
        }); 
    }, []);

  const data = {
    datasets: [
      {
        backgroundColor: '#A5C9CA',
        barPercentage: 0.5,
        barThickness: 65,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: calificationsData,
        label: 'Quantity',
        maxBarThickness: 100,
      },
    ],
    labels: labels,
    parsing: {xAxisKey: 'm'},
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Califications"
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Quantity"
        },
        ticks: {
          stepSize: 1,
        }
      }

    },
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
        }, 
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
          <FormControl sx={{ m: 1, minWidth: 120}}>
      </FormControl>
        )}
        title="Califications metrics"
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
