
import * as React from 'react';
import { AuthContext } from '../contexts/auth-context';
import { userToken } from '../../models/userToken';
import { authAction } from '../../models/authAction';
import { AuthService } from '../../services/AuthServices';
import { CONFIG } from '../../config';

import Router from 'next/router';

export default function Navigation() {

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken = null;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', userToken: userToken });
    };

    bootstrapAsync();
  }, []);


  const [state, dispatch] = React.useReducer(
    (prevState, authAction) => {
      switch (authAction.type) {
        case 'RESTORE_TOKEN':
          AuthService.setCurrentUserToken(authAction.userToken);
          return {
            ...prevState,
            userToken: authAction.userToken,
            isLoading: false,
          };
        case 'SIGN_IN':
          AuthService.setCurrentUserToken(authAction.userToken);
          return {
            ...prevState,
            isSignout: false,
            userToken: authAction.userToken,
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
    }
  );



  const authContext = React.useMemo(
    () => ({
      logIn: async (email, password) => {

        if (CONFIG.bypassLogin) {
          admin = new Admin(420, "email", "firstName", "lastName", "address", "password"),
          token = new userToken( admin, 'EL_TOKEN')
          const authAction = new authAction(userToken, 'SIGN_IN');
          dispatch(authAction);
          return null;
        }

        const userToken = AuthService.validateLogin(email, password);
        if(userToken == null){
          //Si son incorrectos a donde los mandamos??
          Router.push('.')
          email = '';
          password = '';
          setError("show");
        }       
        const authAction = new authAction(userToken, 'SIGN_IN');
        dispatch(authAction);
        return null;           
      },
      signOut: () => dispatch({ type: 'SIGN_OUT', userToken: null }),
      
    }),
    []
  );

  const handleMetrics = () => (Router.push('/metrics'));
  const handleRedirection = () => (Router.push('/logIn'));

  return (
    <AuthContext.Provider value={authContext}>
      { 
            state.userToken !== null ? (handleMetrics()) : (handleRedirection())
      } 
        
    </AuthContext.Provider>
  );
}
