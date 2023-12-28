import React from "react";
import { useRouter } from "next/router";
import GameTavlia from "@/components/GameTavlia";

export default function Game2x2() {
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
          Loading...
        </div>
      </>
    );
  }
}