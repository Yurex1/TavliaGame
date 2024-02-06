import React from "react";
import useUser from "../hooks/useUser";
import FriendListItem from "@/components/ListItem/FriendListItem";
import GameListItem from "@/components/ListItem/GameListItem";

export default function Profile() {
  const user = useUser();
  const username = "tedi20";
  const avatar = "Avatar.png";
  const rang = "2100";

  const friendList = [
    {
      id: "1",
      name: "tedi20",
      rating: 120,
    },
    {
      id: "2",
      name: "tedi20",
      rating: 120,
    },
    {
      id: "3",
      name: "tedi20",
      rating: 120,
    },
    {
      id: "4",
      name: "tedi20",
      rating: 120,
    },
    {
      id: "5",
      name: "tedi20",
      rating: 120,
    },
    {
      id: "6",
      name: "tedi20",
      rating: 120,
    },
    {
      id: "7",
      name: "tedi20",
      rating: 120,
    },
    {
      id: "8",
      name: "tedi20",
      rating: 120,
    },
    {
      id: "9",
      name: "tedi20",
      rating: 120,
    },
    {
      id: "10",
      name: "tedi20",
      rating: 120,
    },
  ];

  const gameList = [
    {
      id: "1",
      color: "king",
      status: "win",
    },
    {
      id: "1",
      color: "king",
      status: "lose",
    },
    {
      id: "1",
      color: "king",
      status: "win",
    },
    {
      id: "1",
      color: "king",
      status: "lose",
    },
    {
      id: "1",
      color: "king",
      status: "lose",
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
                {friendList.map((item) => (
                  <FriendListItem {...item} />
                ))}
              </div>
            </div>
            <div className="full-list">
              <div className="list-name">Game</div>
              <div className="list">
                {gameList.map((item) => 
                    <GameListItem {...item} />  
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
