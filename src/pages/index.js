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
import { currentAdmin, currentUserToken } from '../contexts/currentAdmin';





const Page = () => {
  //const [error, setError] = useState('');
  useEffect(() => {     
   
    const aux  = JSON.parse(localStorage.getItem('userToken'));

    if (aux  == null) {
      Router.push('/logIn').catch(console.error);
    }
    else{      
      currentUserToken.setUserToken(aux.user, aux.token);
      const admin = currentUserToken.user;
      currentAdmin.setAdmin(admin.adminId, admin.email, admin.firstName, admin.lastName, admin.password);      
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