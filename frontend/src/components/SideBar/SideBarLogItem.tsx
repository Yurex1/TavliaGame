// import useUser from "@/hooks/useUser";
import useLogout from "@/hooks/useLogout";
import useUser from "@/hooks/useUser";
import { FC } from "react";
import React from 'react'

type SideBareLogItemProps = {
  setShowAuth: (showAuth: boolean) => void;
};



const SideBareLogItem:FC<SideBareLogItemProps> = ({setShowAuth}) => {
  const user = useUser();
  const logout = useLogout();
  if (!user.data) {
    return (
      <button onClick = {() => {setShowAuth(true)}} className="aside-item">
        <div  className="text">Log In</div>
      </button>
    );
  } else {
    return (
      <div onClick= {() => {logout()}} className="aside-item">
        <div className="text">Log Out</div>
      </div>
    );
  }
};

export default SideBareLogItem;
