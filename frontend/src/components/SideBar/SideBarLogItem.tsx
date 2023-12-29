// import useUser from "@/hooks/useUser";
import { FC } from "react";
import React from 'react'

type SideBareLogItemProps = {
  setShowAuth: (showAuth: boolean) => void;
};



const SideBareLogItem:FC<SideBareLogItemProps> = ({setShowAuth}) => {
  // const user = useUser();
  // console.log(user);
  // eslint-disable-next-line no-constant-condition
  if (true) {
    return (
      
      <button onClick = {() => {setShowAuth(true)}} className="aside-item">
        <img className="icon" src = "arrow.png"/>
        <div  className="text">Log In</div>
      </button>
    );
  } else {
    return (
      <div onClick= {() => {console.log('logout')}} className="aside-item">
        <img className="icon" src = "arrow.png"/>
        <div className="text">Log Out</div>
      </div>
    );
  }
};

export default SideBareLogItem;
