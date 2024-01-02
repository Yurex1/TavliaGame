import React from "react";
import { useState } from "react";
import axios from "axios";
import API_URL from "@/constants";

type RankType = {
  id: number;
  rank: number;
  name: string;
};

export default function Rank() {
  const [list, setList] = useState<RankType[]>([]);

  const fun = async () => {
    let array: RankType[] = [];
    const res = (await axios.get(API_URL + "auth/findAll")).data;
    res.map((item: any) => {
      array.push({ id: item.id, rank: item.rank, name: item.login });
    });
    setList(array);
  };
  if(list.length === 0)
    fun();
  const [sortOrder, setSortOrder] = useState({ field: "rank", order: "asc" });

  const sortList = (field: "rank" | "name") => {
    const order =
      sortOrder.field === field && sortOrder.order === "asc" ? "desc" : "asc";

    const sortedList = [...list].sort((a, b) => {
      if (field === "rank") {
        return order === "asc" ? a.rank - b.rank : b.rank - a.rank;
      } else {
        return order === "asc"
          ? a[field].localeCompare(b[field])
          : b[field].localeCompare(a[field]);
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
            <button onClick={() => sortList("rank")} className="rank-button">
              Rank
            </button>
            <button onClick={() => sortList("name")} className="rank-button">
              Name
            </button>
          </div>
          <ul className="rank-standing">
            {renderList.map((item) => (
              console.log(item),
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
