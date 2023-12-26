import { useRouter } from "next/router";
import GameTavlia from "@/components/GameTavlia";

export default function Game() {
  const router = useRouter();
  const { n } = router.query;
  return (
    <>
      <div className='wrapper'>
        <GameTavlia n = {n}/>
      </div>
    </>
  );
}