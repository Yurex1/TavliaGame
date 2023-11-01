import { FC } from "react";

type SideBareLogItemProps = {
  setShowAuth: (showAuth: boolean) => void;
};



const SideBareLogItem:FC<SideBareLogItemProps> = ({setShowAuth}) => {
  if (true) {
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
