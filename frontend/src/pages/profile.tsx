import React from "react";
import useUser from "../hooks/useUser";

export default function Profile() {
  const user = useUser();
  const username = "tedi20 (Roman)";
  const avatar = "Avatar.png";
  return (
    <>
      <div className="profile">
        <div className="wrapper">
          <div className="profile-header">
            <img className="avatar" src={avatar} alt="" />
            <div className="user-info">
              <div className="profile-name">{username}</div>
              <div className="rang">2100</div>
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
