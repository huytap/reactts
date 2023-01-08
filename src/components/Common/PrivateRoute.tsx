import * as React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
export interface IPrivateRouteProps {
}

export function PrivateRoute (props: IPrivateRouteProps) {
  //Check if user is logged in
  //If ys, show route
  //Otherise, rediect to login page
  const isLoggedIn = Boolean(window.localStorage.getItem('access_token'));
  if(!isLoggedIn) return <Navigate to="/login" />;

  return <Outlet />
}
