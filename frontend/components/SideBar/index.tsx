import SideBarItem from "./SideBarItem";
import SideBarLogItem from "./SideBarLogItem";
export default function SideBare() {
  return (
    <aside>
      <div className="top-items">
        <a href="../" className="name">
          {/* <div className='img'></div> */}
          <div className="text">
            <b>Tavlia</b>
          </div>
        </a>
        <SideBarItem text="Play" hrefText="../" />
        <SideBarItem text="Instraction" hrefText="../" />
        <SideBarItem text="Profile" hrefText="../" />
        <SideBarItem text="Rank" hrefText="../" />
        <SideBarItem text="Friends" hrefText="../" />
        <SideBarItem text="Settings" hrefText="../" />
        <SideBarLogItem />
      </div>
      <div className="down-items">
        <SideBarItem text="Help" hrefText="../" />
      </div>
    </aside>
  );
}
