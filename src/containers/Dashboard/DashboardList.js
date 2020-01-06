import React, { Fragment } from "react";
import PropTypes from "prop-types";

const DashboardList = ({ title, array, fieldName }) => {
  return (
    <Fragment>
      <ul className="dashboard-list">
        <h3>{title}</h3>

        {array.map(value => (
          <li className="list-item" key={value.id}>
            <p>{value[fieldName]}</p>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

DashboardList.propTypes = {
  title: PropTypes.string,
  fieldName: PropTypes.string,
  array: PropTypes.array
};
export default DashboardList;
