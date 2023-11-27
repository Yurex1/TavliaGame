import { useRouter } from "next/router";
import GameTavlia from "../components/GameTavlia";
import React from 'react'

export default function Game() {
  const router = useRouter();
  const { n } = router.query;
  console.log(n);
  return (
    <>
      <div className='wrapper'>
        <GameTavlia n = {n}/>
      </div>
    </>
  );
}