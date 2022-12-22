import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout() {
 
  return (
    <Grid container spacing={3} sx={{padding:"0 20px"}}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
