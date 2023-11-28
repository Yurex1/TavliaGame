export default function Rank() {
  const list = [
    {
      id: "1",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "2",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "3",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "4",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "5",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "6",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "7",
      name: "tedi20",
      rank: 120,
    },
  ];
  return (
    <>
      <div className="rank">
        <div className="wrapper">
          <ul className="rank-standing">
            {list.map((item) => {
              return (
                <li key={item.id} className="rank-item">
                  <div className="id">{item.id}</div>
                  <div className="user-name">{item.name}</div>
                  <div className="user-rank">{item.rank}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
