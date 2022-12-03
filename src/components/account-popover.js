import { useContext } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { AuthContext } from '../contexts/auth-context';
import { auth, ENABLE_AUTH } from '../lib/auth';
import { UserToken } from '../../models/userToken';
import { currentAdmin, currentUserToken } from '../contexts/currentAdmin';
import { useRouter } from 'next/router';
import { Admin } from '../../models/admin'

export const AccountPopover = (props) => { 
  const router = useRouter();
  const { anchorEl, onClose, open, ...other } = props;
  const authContext = useContext(AuthContext);

  const handleSignOut = async () => {
    localStorage.setItem('userToken', null);
    const newAdmin = new Admin( 42, '', '', '', '')
    currentUserToken.setUserToken(newAdmin, '');
    Router.push('/logIn').catch(console.error);
    onClose?.();

    // Check if authentication with Zalter is enabled
    // If not enabled, then redirect is not required

    if (!ENABLE_AUTH) {
      return;
    }

    // Check if auth has been skipped
    // From sign-in page we may have set "skip-auth" to "true"
    // If this has been skipped, then redirect to "sign-in" directly
    const authSkipped = globalThis.sessionStorage.getItem('skip-auth') === 'true';

    if (authSkipped) {
      // Cleanup the skip auth state
      globalThis.sessionStorage.removeItem('skip-auth');

      // Redirect to sign-in page
      Router
        .push('/')
        .catch(console.error);
      return;
    }

    try {
      // This can be call inside AuthProvider component, but we do it here for simplicity
      // await auth.signOut();
      // // Update Auth Context state
      // authContext.signOut();

      // Redirect to sign-in page
      Router
        .push('/')
        .catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };
  const handleMyProfile = () => {
    // const currentAdminId = currentAdmin.adminId;
    // router
    //       .replace({
    //         pathname: '/account',
    //         query: "id="  + currentAdminId + "&type=admin",
    //       })
    onClose?.();
         
    
    Router.push("/account?id=" + currentAdmin.adminId + "&type=admin") //DESHARDCODEARLO !!!
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '150px' }
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {currentAdmin.firstName + currentAdmin.lastName}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px'
            },
            padding: '12px 16px'
          }
        }}
      >
        <MenuItem onClick={handleMyProfile}>
          My profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
