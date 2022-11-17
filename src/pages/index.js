import Head from 'next/head';
import Router from 'next/router';
import React, {useMemo, createContext} from 'react';
import { UserToken } from '../../models/userToken';
import Metrics from './metrics';

import { AuthService } from '../../services/AuthServices';

import { Admin } from '../../models/admin';
import { AuthContext } from '../contexts/auth-context';

const Page = () => {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          AuthService.setCurrentUserToken(action.userToken);
          return {
            ...prevState,
            userToken: action.userToken,
            isLoading: false,
          };
        case 'SIGN_IN':
          AuthService.setCurrentUserToken(action.userToken);
          return {
            ...prevState,
            isSignout: false,
            userToken: action.userToken,
          };
        case 'SIGN_OUT':
          AuthService.setCurrentUserToken(null);
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  //const authContext = useAuthContext();

  //const [error, setError] = useState('');
  React.useEffect(() => {
    const userToken = new UserToken('');

/*

    const userToken = new UserToken('');
    userToken = localStorage.getItem('userToken');

    console.log(userToken);


    if (userToken  == null) {
      Router.push('/logIn').catch(console.error);
    }
    else{
      Router.push('/metrics').catch(console.error);

    }*/
    dispatch({ type: 'RESTORE_TOKEN', userToken: userToken });
  }, []);

  const authContext = useMemo(
    () => ({
      logIn: async (email, password) => {
        /*
        if (CONFIG.bypassLogin) {
          const userToken = {
            user: new Passenger(666, "email", "firstName", "lastName", "address", "password", "username", new Wallet("", "address", "password")),
            token: 'EL_TOKEN'
          }
          const authAction = {userToken: userToken, type: 'SIGN_IN'};
          dispatch(authAction);
          return null;
        }*/

        const userToken = await AuthService.login(email, password);

        if (!userToken) {
          return "Usuario o contraseña incorrectos";
        }

        if(userToken.user.blocked){
          return "Usuario Bloqueado";
        }

        const authAction = {userToken: userToken, type: 'SIGN_IN'};

        dispatch(authAction);

        return null;
      },
      signOut: () => dispatch({ type: 'SIGN_OUT', userToken: null }),
      signUp: async (_data) => {
        dispatch({ type: 'SIGN_UP', userToken: null });
      },
    }),
    []
  );

  return(
    <>
      <AuthContext.Provider value={authContext}>
        <Head>
          <title>
            Index | Initial Screen
          </title>
        </Head>
      </AuthContext.Provider>
    </>
)};


export default Page;
