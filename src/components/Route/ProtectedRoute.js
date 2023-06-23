import React, { Fragment } from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { Navigate, Redirect, Route, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({children , isAdmin}) => {
    const alert = useAlert()
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation()
  

  if(isAuthenticated===false )
  {
    return <Navigate  to={`/login?redirect=${location.pathname.substring(1)}`}/>
  }
  if(isAdmin === true && user.role !=="admin" )
  {
    return <Navigate  to="/login" />
  }
  return children
//  return isAuthenticated===false ? <Navigate  to="/login" /> : {isAdmin === true && user.role !=="admin" ? <Navigate  to="/login" />  :children}

};

export default ProtectedRoute;
    // <Fragment>
    //   {loading === false && (
    //     <Route
    //       render={(props) => {
    //         if (isAuthenticated === false) {
    //           return <Navigate to="/login" />;
    //         }

    //         if (isAdmin === true && user.role !== "admin") {
    //           return <Navigate  to="/login" />;
    //         }

    //         return <children {...props} />;
    //       }}
    //     />
    //   )}
    // </Fragment>