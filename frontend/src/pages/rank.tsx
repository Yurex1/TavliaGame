import React from "react";
import useRank from "@/hooks/useRank";
import { useState } from "react";

type RankType = {
  id: number;
  rank: number;
  name: string;
}

export default function Rank() {

  const rank = useRank();
  if(rank.isLoading){
    return <div className="cen">Loading...</div>
  }
  const array: RankType[] = [];
  const tempList : RankType[] = rank.data?.data  as RankType[];
  tempList.map((item) => {
    array.push({id: item.id, rank: item.rank, name: item.name});
  });
  const usersList = array;
  const [list, setList] = useState([...usersList]);
  const [sortOrder, setSortOrder] = useState({ field: 'rank', order: 'asc' });
  // const [friend, setFriend] = useState(false);

  const sortList = (field:'rank'|'name') => {
    const order = sortOrder.field === field && sortOrder.order === 'asc' ? 'desc' : 'asc';

    const sortedList = [...list].sort((a, b) => {
      if (field === 'rank') {
        return order === 'asc' ? a.rank - b.rank : b.rank - a.rank;
      } else {
        return order === 'asc' ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]);
      } 
      return 0;
    });

    setList(sortedList);
    setSortOrder({ field, order });
  };

  const renderList = list;

  return (
    <>
      <div className="rank">
        <div className="wrapper">
          <div className="rank-buttons">
            <button onClick={() => sortList('rank')} className="rank-button">
              Rank
            </button>
            <button onClick={() => sortList('name')} className="rank-button">
              Name
            </button>
            
          </div>
          <ul className="rank-standing">
            {renderList.map((item) => (
              <li key={item.id} className="rank-item">
                <div className="user-rank">{item.rank}</div>
                <div className="user-name">{item.name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
