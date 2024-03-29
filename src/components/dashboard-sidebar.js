import { useEffect, useRef, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Toolbar, Avatar, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { AccountPopover } from './account-popover';


const items = [
  {
    href: '/metrics',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Metrics'
  },
  {
    href: '/passengers',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Passengers'
  },
  {
    href: '/drivers',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Drivers'
  },
  {
    href: '/admins',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Admins'
  },
  {
    href: '/pricing',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Pricing'
  },
  // {
  //   href: '/account/[admin]',
  //   icon: (<UserIcon fontSize="small" />),
  //   title: 'Account'
  // },
  {
    href: '/register',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Register new admin'
  }
];

export const DashboardSidebar = (props, userToken) => {
  const { open, onClose } = props;
  const router = useRouter();
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);


  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
                  {/* <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        > */}
          <Box sx={{ p:3, flexDirection: 'row', display: 'flex'}}>
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1
            }}
            src="/static/images/icon.jpg"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
            <NextLink
              href="/"
              passHref
            >
              <a>
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
        </Box>
      </Box>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
