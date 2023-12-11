import React from "react";
import useUser from "../hooks/useUser";

export default function Profile() {
  const user = useUser();
  const username = "tedi20";
  const avatar = "Avatar.png";
  const rang = "2100";

  const friendList = [
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
    {
      id: "8",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "9",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "10",
      name: "tedi20",
      rank: 120,
    },
  ];

  const gameList = [
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
    {
      id: "8",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "9",
      name: "tedi20",
      rank: 120,
    },
    {
      id: "10",
      name: "tedi20",
      rank: 120,
    },
  ];

  return (
    <>
      <div className="profile">
        <div className="wrapper">
          <div className="profile-header">
            <img className="avatar" src={avatar} alt="" />
            <div className="user-info">
              <div className="profile-name">{username}</div>
              <div className="rang">rating: {rang}</div>
            </div>
          </div>
          <div className="lists">
            <div className="full-list">
              <div className="list-name">Friend</div>
              <div className="list">
                {friendList.map((item) => {
                  return (
                    <div key={item.id} className="list-item">
                      <div className="id">{item.id}</div>
                      <div className="user-name">{item.name}</div>
                      <div className="user-rank">{item.rank}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="full-list">
              <div className="list-name">Game</div>
              <div className="list">
                {gameList.map((item) => {
                  return (
                    <div key={item.id} className="list-item">
                      <div className="id">{item.id}</div>
                      <div className="user-name">{item.name}</div>
                      <div className="user-rank">{item.rank}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
