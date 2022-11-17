import { createContext, useContext, useState, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { auth, ENABLE_AUTH } from '../lib/auth';

import { UserToken } from '../../models/userToken';
import { AuthAction } from '../../models/authAction';
import { AuthService } from '../../services/AuthServices';
import * as React from 'react';
import { CONFIG } from '../../config';
import Router from 'next/router';




const dispatch = (authAction) => {
  console.log(authAction.type);
  switch (authAction.type) {
    case 'RESTORE_TOKEN':
      console.log("Case RT");
      AuthService.setCurrentUserToken(authAction.userToken); 
      return;
    case 'SIGN_IN':
      console.log("Case SI");
      AuthService.setCurrentUserToken(authAction.userToken);    
      return;      
    case 'SIGN_OUT':
      console.log("Case SO");
      AuthService.setCurrentUserToken(null);  
  }

};

// The role of this context is to propagate authentication state through the App tree.
export const AuthContext = createContext({ undefined });



export const AuthProvider = (props) => { 

  const [error, setError] = useState("hidden");
  const { children } = props;

  const logIn = async (email, password) => {
    if (CONFIG.bypassLogin) {
      admin = new Admin(420, "email", "firstName", "lastName", "address", "password"),
      token = new UserToken( admin, 'EL_TOKEN')
      const authAction = new AuthAction(userToken, 'SIGN_IN');
      dispatch(authAction);
      return null;
    }    

    const userToken = await AuthService.validateLogin(email, password);
    if(userToken == null){
      return null;
    }       
    const authAction = new AuthAction(userToken, 'SIGN_IN');
    
    dispatch(authAction);
    //Estaria bueno acá, al pushear metrics, pasarle el usuario.
    Router.push('/metrics');
    return true;      
  };
  
  const signOut = (userToken) => {
    const authAction = new AuthAction(userToken, 'SIGN_OUT');
    dispatch(authAction);
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        signOut
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





































  
