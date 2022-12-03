import { createContext, useContext, useState, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { auth, ENABLE_AUTH } from '../lib/auth';

import { UserToken } from '../../models/userToken';
import { AuthAction } from '../../models/authAction';
import { AuthService } from '../../services/AuthServices';
import * as React from 'react';
import { CONFIG } from '../../config';
import Router from 'next/router';
import { currentUserToken } from './currentAdmin';




// This is obsolete
// const dispatch = (authAction) => {
//   console.log(authAction.type);
//   switch (authAction.type) {
//     case 'RESTORE_TOKEN':
//       console.log("Case RT");
//       currentUserToken.setUserToken()
//       AuthService.setCurrentUserToken(authAction.userToken);
//       return;
//     case 'SIGN_IN':
//       console.log("Case SI");
//       AuthService.setCurrentUserToken(authAction.userToken);
//       return;
//     case 'SIGN_OUT':
//       console.log("Case SO");
//       AuthService.setCurrentUserToken(null);
//   }

// };

// The role of this context is to propagate authentication state through the App tree.
export const AuthContext = createContext({ undefined });



export const AuthProvider = (props) => {

  const [error, setError] = useState("hidden");
  const { children } = props;

  const logIn = async (email, password) => {
    if (CONFIG.bypassLogin) {
      admin = new Admin(420, "email", "firstName", "lastName", "address", "password");
      currentUserToken.setUserToken(admin, 'EL_TOKEN');
      // const authAction = new AuthAction(currentUserToken, 'SIGN_IN');
      // dispatch(authAction);
      return null;
    }

    // The next service will update currentUserToken if everything goes okay
    await AuthService.validateLogin(email, password);

    if (currentUserToken.token == '') {
      //Aca tendria que haber un error?
      return;
    }
    // const authAction = new AuthAction(userToken, 'SIGN_IN');

    // dispatch(authAction);

    localStorage.setItem('userToken', JSON.stringify(currentUserToken));
    //Estaria bueno acá, al pushear metrics, pasarle el usuario.
    Router.push('/metrics');

  };

  // const signOut = (currentUserToken) => {
  //   const authAction = new AuthAction(currentUserToken, 'SIGN_OUT');
  //   dispatch(authAction);
  // };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);




//-------------------------------------------------------------






































