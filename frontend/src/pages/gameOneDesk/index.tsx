import React from "react";
import { useRouter } from "next/router";
import GameTavlia from "@/components/GameTavlia";
import gameData from "@/Data/Game";

export default function GameOneDesk() {
  const DTO = gameData();
  const router = useRouter();
  const  { n }  = router.query;
  if(n)
  {
    const ty = n && n.toString();
    return (
      <>
        <div className='wrapper'>
          {ty && <GameTavlia n={parseInt(ty)} />}
        </div>
      </>
    );
  }
  else{
    return(
      <>
        <div className='wrapper'>
          {DTO.Loading}
        </div>
      </>
    );
  }
}