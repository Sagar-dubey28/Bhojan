import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("BhojanUser") || null)
  );
  const [isLogin, setIsLogin] = useState(!user);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  const value = {user,setUser,isLogin,setIsLogin};

  return (<AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>);
};

export const useAuth= ()=>{
  return useContext(AuthContext);
} ;
