import { useRouter } from "next/router";
import SideBare from "../../components/SideBar";
import GameTavlia from "../../components/GameTavlia";

export default function Game() {
  const router = useRouter();
  const { n } = router.query;
  console.log(n);
  return (
    <>
      <div className='wrapper'>
        <SideBare /> 
        <GameTavlia n = {n}/>
      </div>
    </>
  );
}