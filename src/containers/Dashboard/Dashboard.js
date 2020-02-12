import React, { useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { LinkButton } from "../../components/Buttons/LinkButton";
import "./Dashboard.scss";
// Connect server url
import { SERVER_URL } from "../../shared/serverUrl";
import axios from "axios";
// import { getRegisteredUsers } from "../../utils/api";
export const Dashboard = withCookies(props => {
  const [users, setUsers] = useState([]);

  const getData = () => {
    axios
      .all([
        axios.get(`${SERVER_URL}/dashboard`),
        axios.post(
          `${SERVER_URL}/checkToken`,
          {},
          {
            headers: {
              "x-auth": `${props.cookies.get("token")}`
            }
          }
        )
      ])
      .then(
        axios.spread((dashboard, checkToken) => {
          console.log(dashboard);
          console.log(checkToken);

          if (checkToken.status === 200) {
            const users = dashboard.data;
            setUsers(users);
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
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
});
