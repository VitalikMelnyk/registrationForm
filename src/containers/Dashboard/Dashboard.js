import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { LinkButton } from "../../components/Buttons/LinkButton";
import DashboardList from "./DashboardList";
import "./Dashboard.scss";
// Connect server url
import { SERVER_URL } from "../../shared/serverUrl";
export default class Dashboard extends Component {
  state = {
    users: []
  };
  async componentDidMount() {
    const url = `${SERVER_URL}/dashboard`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({
      users: data
    });
  }

  render() {
    return (
      <Fragment>
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
            <DashboardList
              array={this.state.users}
              fieldName="email"
              title="Email"
            />
            <DashboardList
              array={this.state.users}
              fieldName="password"
              title="Password"
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
