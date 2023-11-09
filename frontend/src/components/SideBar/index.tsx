import { Dispatch, FC, SetStateAction } from "react";
import SideBarItem from "./SideBarItem";
import SideBarLogItem from "./SideBarLogItem";
type SideBareProps = {
  setShowAuth: (showAuth: boolean) => void;
}


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
        <SideBarItem text="Instraction" hrefText="../" />
        <SideBarItem text="Profile" hrefText="../" />
        <SideBarItem text="Rank" hrefText="../" />
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