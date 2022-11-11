import { useState, useEffect, Text} from 'react';
import { UsersService } from '../../services/UsersServices';


import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
  } from '@mui/material';


  export const PriceRules = (props) => {

   
    const [prices, setPrices] = useState([]);
  
    // useEffect(() => {
    //   UsersService.setPrices().then((value) => { 
        
    //   }).catch((error) => {
    //     console.log(error);
    //   });
      
    // }, [setPrices]);





  
    return (
      <form
        autoComplete="off"
        noValidate
        {...props}
      >
  
       </form>
    );
  };