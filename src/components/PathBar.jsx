// import * as React from 'react';
// import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { AppBar } from '@mui/material';
// import { Padding } from '@mui/icons-material';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function PathBar() {
  return (
    <AppBar role="presentation" onClick={handleClick} position='fixed' sx={{top: 48,width: '100%', height: '30px', backgroundColor: '#fff', display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 2}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/Dashboard">
          Dashboard
        </Link>
      </Breadcrumbs>
    </AppBar>
  );
}