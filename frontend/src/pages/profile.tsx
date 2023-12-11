import React from "react";
import useUser from "../hooks/useUser";

export default function Profile() {
  const user = useUser();
  const username = "tedi20";
  const avatar = "Avatar.png";
  const rang = "2100";
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
          <select className="select" size = {2}>
          <option>asd</option>
          <option>asd</option>
          <option>asd</option><option>asd</option><option>asd</option><option>asd</option><option>asd</option><option>asd</option><option>asd</option><option>asd</option><option>asd</option><option>asd</option>
          <option>asd</option>
          <option>asd</option>
          <option>asd</option>
          <option>asd</option>
          <option>asd</option>
          <option>asd</option>
          <option>asd</option>
          </select>
        </div>
      </div>
    </>
  );
}
