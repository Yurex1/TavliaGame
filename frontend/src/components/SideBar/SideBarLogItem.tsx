import useUser from "@/hooks/useUser";
import { FC, use } from "react";

type SideBareLogItemProps = {
  setShowAuth: (showAuth: boolean) => void;
};



const SideBareLogItem:FC<SideBareLogItemProps> = ({setShowAuth}) => {
  const user = useUser();
  if (user === null) {
    return (
      <button onClick = {() => {setShowAuth(true)}} className="aside-item">
        <div  className="text">Log In</div>
      </button>
    );
  } else {
    return (
      <div onClick= {() => {console.log('logout')}} className="aside-item">
        <div className="text">Log Out</div>
      </div>
    );
  }
};

export default SideBareLogItem;
