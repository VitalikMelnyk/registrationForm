import React, { useState, useEffect } from "react";
// import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { LinkButton } from "../../components/Buttons/LinkButton";
import "./Dashboard.scss";
// Connect server url
import { SERVER_URL } from "../../shared/serverUrl";
export const Dashboard = props => {
  const [users, setUsers] = useState([]);
  // const [cookies] = useCookies(["token"]);
  // console.log(cookies);

  const getData = async () => {
    const url = `${SERVER_URL}/dashboard`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    setUsers(data);
  };

  useEffect(() => {
    getData();
  }, []);
  // console.log(props);
  return (
    <>
      <div className="dashboard">
        <Link to="/">
          <LinkButton
            btnType="outline-success"
            className="dashboard-btn"
            titleBtn="Begin"
          />
        </Link>
        <h1 className="dashboard-title text-center">
          List of registered users
        </h1>

        <div className="container">
          <div className="dashboard-board row no-gutters">
            {users.map(user => (
              <div key={user._id} className="col-12 col-lg board-item">
                <div className="board-item-section">
                  <p className="title">Email: </p>
                  <p className="description">{user.email}</p>
                </div>
                <div className="board-item-section">
                  <p className="title">City: </p>
                  <p className="description">{user.city}</p>
                </div>
                <div className="board-item-section">
                  <p className="title">Date of birth: </p>
                  <p className="description">{user.date}</p>
                </div>
                <div className="board-item-section">
                  <p className="title">Gender: </p>
                  <p className="description">{user.gender}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
