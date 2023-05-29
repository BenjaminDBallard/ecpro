import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import FormGroup from '@mui/material/FormGroup';
import ecproLogo from '../assets/ecproLogo.png'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

export default function NavigationBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1,}}>
      <AppBar position="fixed" sx={{backgroundColor: '#fff', color: '#222', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {/* <Toolbar disableGutters> */}
          
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            sx={{ padding: 1 }}
          >
            <Avatar variant='square' src={ecproLogo} sx={{height: 30, width: 30,}}/>
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1,}}>
            {isAuthenticated && (
              <Link to='dashboard'>ECpro</Link>
            )}
            {!isAuthenticated &&(
              <Link to='/'>ECpro</Link>
            )}
          </Typography>
          <FormGroup>
      </FormGroup>
      
          {!isAuthenticated && (
            <Button size='small' onClick={() => loginWithRedirect()} variant='contained'>LOGIN</Button>
          )}
          
          {isAuthenticated && (
            <div>
              <Link to='dashboard'><Button variant='filled'>Dashboard</Button></Link>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar variant='circle' src={user.picture} sx={{height: 30, width: 30,}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to='/profile'>Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}><Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>logout</Button></MenuItem>
              </Menu>
              {/* <PathBar /> */}
            </div>
          )}
        {/* </Toolbar> */}
      </AppBar>
    </Box>
  );
}