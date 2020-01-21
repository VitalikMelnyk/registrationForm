import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkButton } from "../../components/Buttons/LinkButton";
import DashboardList from "./DashboardList";
import "./Dashboard.scss";

// Connect server url
import { SERVER_URL } from "../../shared/serverUrl";
const Dashboard = props => {
  const [users, setUsers] = useState([]);

  const getData = async () => {
    const url = `${SERVER_URL}/dashboard`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setUsers(data);
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
        <div className="dashboard-usersTable">
          <DashboardList array={users} fieldName="email" title="Email" />
          <DashboardList array={users} fieldName="password" title="Password" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
