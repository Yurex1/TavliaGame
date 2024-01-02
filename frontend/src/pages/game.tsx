import React from "react";
import { useRouter } from "next/router";
import OnlineGame from "@/components/OnlineGame";
import useUser from "@/hooks/useUser";

export default function Game() {
  const router = useRouter();
  const  { n }  = router.query;
  const user = useUser();
  if(n && user.data)
  {
    const ty = n && n.toString();
    return (
      <>
        <div className='wrapper'>
          {ty && <OnlineGame n = {parseInt(ty)} userId={user.data.data.sub}/>}
        </div>
      </>
    );
  }
  else if(user.data){
    return(
      <>
        <div className='message'>
          Loading...
        </div>
      </>
    );
  }
  else{
    return(
      <>
        <div className='message'>
          Please login{')'}
        </div>
      </>
    );
  }
}
