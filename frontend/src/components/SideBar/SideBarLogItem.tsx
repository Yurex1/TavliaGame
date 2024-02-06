// import useUser from "@/hooks/useUser";
import useLogout from "@/hooks/useLogout";
import useUser from "@/hooks/useUser";
import { FC } from "react";
import React from 'react'

type SideBareLogItemProps = {
  setShowAuth: (showAuth: boolean) => void;
  Login: string;
  Logout: string;
};



const SideBareLogItem:FC<SideBareLogItemProps> = ({setShowAuth, Login, Logout}) => {
  const user = useUser();
  const logout = useLogout();
  if (!user.data) {
    return (
      
      <button onClick = {() => {setShowAuth(true)}} className="aside-item">
        <img className="icon" src = "arrow.png"/>
        <div  className="text">{Login}</div>
      </button>
    );
  } else {
    return (
      <div onClick= {() => {logout()}} className="aside-item">
        <img className="icon" src = "logOut.png"/>
        <div className="text">{Logout}</div>
      </div>
    );
  }
};

export default SideBareLogItem;
