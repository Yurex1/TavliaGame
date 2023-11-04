import { FC } from "react";

type SideBareLogItemProps = {
  setShowAuth: (showAuth: boolean) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};



const SideBareLogItem:FC<SideBareLogItemProps> = ({setShowAuth, loggedIn, setLoggedIn}) => {
  if (!loggedIn) {
    return (
      <button onClick = {() => {setShowAuth(true)}} className="aside-item">
        <div  className="text">Log In</div>
      </button>
    );
  } else {
    return (
      <div onClick= {() => setLoggedIn(false)} className="aside-item">
        <div className="text">Log Out</div>
      </div>
    );
  }
};

export default SideBareLogItem;
