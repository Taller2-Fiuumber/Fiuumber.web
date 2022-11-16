import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useRef } from 'react';
import { UserToken } from '../../models/userToken';
import * as React from 'react';
import Metrics from './metrics';

import { AuthAction } from '../../models/authAction';
import { AuthService } from '../../services/AuthServices';
import { CONFIG } from '../../config';

import { Admin } from '../../models/admin';




const Page = () => {
  //const [error, setError] = useState('');
  useEffect(() => {
    //Seria clave hacer global a esta 
    const logged = false;
  
    
    const userToken = new UserToken('');
    userToken = localStorage.getItem('userToken');
    
    console.log(userToken);

    
    if (userToken  == null) {
      logged = false;
      Router.push('/logIn').catch(console.error);
    }
    else{
      logged = true;        
      Router.push('/metrics').catch(console.error);

    }
  }, []);

  return(
    <>
      <Head>
        <title>
          Index | Initial Screen
        </title>
      </Head>   
    </>
)};


export default Page;