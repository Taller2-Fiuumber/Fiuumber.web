import { useContext } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { AuthContext } from '../contexts/auth-context';
import { UserToken } from '../../models/userToken';
import { currentAdmin } from '../contexts/currentAdmin';
import { useRouter } from 'next/router';

export const AccountPopover = (props) => {
  const router = useRouter();
  const { anchorEl, onClose, open, ...other } = props;

  const handleSignOut = async (userToken) => {

    localStorage.setItem('userToken', JSON.stringify(""));

    Router.push('/logIn').catch(console.error);
    onClose?.();

    // Redirect to sign-in page
    Router
      .push('/')
      .catch(console.error);
    return;
  };

  const handleMyProfile = () => {
    // const currentAdminId = currentAdmin.adminId;
    // router
    //       .replace({
    //         pathname: '/account',
    //         query: "id="  + currentAdminId + "&type=admin",
    //       })


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
