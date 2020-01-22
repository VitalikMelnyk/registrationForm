import React from "react";
import PropTypes from "prop-types";

const DashboardList = ({ title, array, fieldName }) => {
  return (
    <>
      <ul className="dashboard-list">
        <h3>{title}</h3>

        {array.map(value => (
          <li className="list-item" key={value._id}>
            <p>{value[fieldName]}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

DashboardList.propTypes = {
  title: PropTypes.string,
  fieldName: PropTypes.string,
  array: PropTypes.array
};
export default DashboardList;
