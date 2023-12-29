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
            <b>T</b>
            <b className="notformobile">avlia</b>
          </div>
        </a>
        <SideBarItem text="Play" hrefText="../" img_url={"Lightning.png"}  />
        <SideBarItem text="Instruction" hrefText="../" img_url={"info.png"} />
        <SideBarItem text="Profile" hrefText="../" img_url={"prof.png"} />
        <SideBarItem text="Rank" hrefText="../rank" img_url={"rank.png"} />
        <SideBarItem text="Friends" hrefText="../" img_url={"friends.png"} />
        <SideBarItem text="Settings" hrefText="../" img_url={"sett.png"} />
        <SideBarLogItem setShowAuth = {setShowAuth}/>
      </div>
      <div className="down-items">
        <SideBarItem text="Help" hrefText="../" img_url={"help.png"} />
      </div>
    </aside>
  );
}

export default SideBare;