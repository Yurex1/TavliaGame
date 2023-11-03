import { FC } from "react";

type SideBareLogItemProps = {
  setShowAuth: (showAuth: boolean) => void;
  loggedIn: boolean;
};



const SideBareLogItem:FC<SideBareLogItemProps> = ({setShowAuth, loggedIn}) => {
  if (!loggedIn) {
    return (
      <button onClick = {() => {setShowAuth(true)}} className="aside-item">
        <div  className="text">Log In</div>
      </button>
    );
  } else {
    return (
      <div className="aside-item">
        <div className="text">Log Out</div>
      </div>
    );
  }
};

export default SideBareLogItem;
