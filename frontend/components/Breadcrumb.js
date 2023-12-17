import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Breadcrumb.css";

/* Breadcrumb component renders breadcrumb navigation based on label
 * label : array containing objects { title: string, pathname: string }
 */
const Breadcrumb = ({ label }) => {
  const navigate = useNavigate();

  return (
    <div className="breadcrumb">
      {/* home link */}
      <Link to="/Home" className="link-style">
        <span className="breadcrumb-text">หน้าหลัก</span>
      </Link>

      {/* mapping through each label to create breadcrumb navigation */}
      {label.map((item, index) => (
        <React.Fragment key={item.title}>
          {/* arrow icon */}
          <span className="arrow">
            <img
              src={require("./image/angle-small-right.svg").default}
              alt="angle-icon"
            />
          </span>
          {index === label.length - 1 ? (
            // last breadcrumb item (there are no link for current page)
            <span className="breadcrumb-text">{item.title}</span>
          ) : item.pathname === "/-1" ? (
            // if the pathname is '/-1', render the clickable title to go back to the previous page
            <span
              className="breadcrumb-text link-style"
              onClick={() => navigate(-1)}
            >
              {item.title}
            </span>
          ) : (
            // regular link to the provided pathname
            <Link to={item.pathname} className="link-style">
              <span className="breadcrumb-text">{item.title}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
