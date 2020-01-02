import React, { useState, useEffect, Fragment, Component } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.scss";

// export default function Dashboard() {
//   const [data, setData] = useState({ users: [] });

//   useEffect( () => {
//     // const fetchData = async () => {
//     //   const result = await axios("http://localhost:3002/dashboard");
//     //   setData(result.data);
//     // };
//     // fetchData();
//     const url = "http://localhost:3002/dashboard";
//     const response = fetch(url);
//     const data = response.data.json();
//     console.log(data);
//   }, []);

//   return (
//     <Fragment>
//       <div className="dashboard">
//         <h1 className="dashboard-title text-center">
//           List of registered users
//         </h1>
//         <div className="dashboard-usersTable">
//           <ul>
//             {data.users.map(user => (
//               <li key={user.id}>
//                 <p>{user.email}</p>
//                 {/* <p>{user.password}</p> */}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </Fragment>
//   );
// }

export default class Dashboard extends Component {
    state = {
        users: []
    }
  async componentDidMount() {
    const url = "http://localhost:3002/dashboard";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({
        users: data
    })
  }

  render() {
    return (
      <Fragment>
        <div className="dashboard">
            <Link to="/" className="btn btn-outline-success dashboard-btn">Sign up</Link>
          <h1 className="dashboard-title text-center">
            List of registered users
          </h1>
          <div className="dashboard-usersTable">
            <ul className="dashboard-list">
            <h3>Email</h3>
                
              {this.state.users.map(user => (
                <li className="list-item" key={user.id}>
                  <p>{user.email}</p>
                  {/* <p>Password: {user.password}</p> */}
                </li>
              ))}
            </ul>
            <ul className="dashboard-list">
            <h3>Password</h3>
                
              {this.state.users.map(user => (
                <li className="list-item" key={user.id}>
                  {/* <p>Email: {user.email}</p> */}
                  <p> {user.password}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}
