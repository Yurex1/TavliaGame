import React from "react";
import useRank from "@/hooks/useRank";
import { useState } from "react";

export default function Rank() {

  const usersList = useRank();

  const initialList = [
    {
      id: "1",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "2",
      name: "john",
      rank: 90,
    },
    {
      id: "3",
      name: "alice",
      rank: 110,
    },
    {
      id: "4",
      name: "bobaaaaaaaaaaaaaaa",
      rank: 200,
    },
  ];

  const [list, setList] = useState([...initialList]);
  const [sortOrder, setSortOrder] = useState({ field: 'rank', order: 'asc' });
  const [friend, setFriend] = useState(false);

  const sortList = (field:'id'|'rank'|'name') => {
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

  const renderList = friend ? list.filter(item => false) : list;

  return (
    <>
      <div className="rank">
        <div className="wrapper">
          <div className="rank-buttons">
            <button onClick={() => sortList('id')} className="rank-button id">
              ID
            </button>
            <button onClick={() => sortList('name')} className="rank-button user-name">
              Name
            </button>
            <button onClick={() => sortList('rank')} className="rank-button">
              Rank
            </button>
            
          </div>
          <ul className="rank-standing">
            {renderList.map((item) => (
              <li key={item.id} className="rank-item">
                <div className="id">{item.id}</div>
                <div className="user-name">{item.name}</div>
                <div className="user-rank">{item.rank}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
