import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



const PrivateRoute = ({children}) =>{
  const token = localStorage.getItem('authToken');

  if(!token){
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    
    const isExpired = decoded.exp * 1000 <Date.now();
    if(isExpired){
      localStorage.removeItem("authToken");
      localStorage.removeItem('user');
      return <Navigate to="/login" />
    }

    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" />;
    
  }

}

const AdminPrivateRoute = ({children})=>{
  const token = localStorage.getItem('adminAuthToken');

  if(!token){
    return <Navigate to="/admin/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    
    const isExpired = decoded.exp * 1000 <Date.now();
    if(isExpired){
      localStorage.removeItem("adminAuthToken");
      localStorage.removeItem('team');
      return <Navigate to="/admin/login" />
    }

    return children;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/admin/login" />;
    
  }


}



export  {PrivateRoute, AdminPrivateRoute}