import {  FC,  } from "react";
import SideBarItem from "./SideBarItem";
import SideBarLogItem from "./SideBarLogItem";
type SideBareProps = {
  setShowAuth: (showAuth: boolean) => void;
}
import React from 'react'


const SideBare:FC<SideBareProps> = ({setShowAuth}) => {
  return (
    <aside>
      <div className="top-items">
        <a href="../" className="name">
          {/* <div className='img'></div> */}
          <div>
            <b>Tavlia</b>
          </div>
        </a>
        <SideBarItem text="Play" hrefText="../" />
        <SideBarItem text="Instruction" hrefText="../" />
        <SideBarItem text="Profile" hrefText="../" />
        <SideBarItem text="Rank" hrefText="../rank" />
        <SideBarItem text="Friends" hrefText="../" />
        <SideBarItem text="Settings" hrefText="../" />
        <SideBarLogItem setShowAuth = {setShowAuth}/>
      </div>
      <div className="down-items">
        <SideBarItem text="Help" hrefText="../" />
      </div>
    </aside>
  );
}

export default SideBare;