import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import "./Navbar.css";
import searchIcon from "./image/search.svg";
import logoIcon from "./image/logo.svg";
import chatIcon from "./image/chat.svg";
import postIcon from "./image/post.svg";
import profileIcon from "./image/profile.svg";

// Navbar component for the navigation bar
const Navbar = () => {
  const [click, setClick] = useState(false); // state to handle the visibility of the mobile menu
  // eslint-disable-next-line
  const [button, setButton] = useState(true); // state to handle the visibility of a button

  // function to toggle the mobile menu
  const handleClick = () => setClick(!click);
  // function to close the mobile menu
  const closeMobileMenu = () => setClick(false);

  // function to determine if the mobile menu button should be displayed based on window width
  const showButton = () => {
    if (window.innerWidth <= 1300) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  // event listener for window resize to update button visibility
  window.addEventListener("resize", showButton);

  return (
    <Container>
      <Row>
        {/* navigation bar structure */}
        <nav className="navbar">
          <div className="navbar-container">
            {/* home link with logo */}
            <Link to="/Home" className="navbar-logo" onClick={closeMobileMenu}>
              <img src={logoIcon} alt="home page" />
            </Link>

            {/* mobile menu button */}
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
            </div>

            {/* navigation menu items */}
            <ul
              className={click ? "nav-menu active" : "nav-menu"}
              onClick={closeMobileMenu}
            >
              {/* search link */}
              <li className="nav-item">
                <Link
                  to="/Search"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <img
                    className="nav-icon"
                    src={searchIcon}
                    alt="search page"
                  />
                </Link>
              </li>

              {/* all post link */}
              <li className="nav-item">
                <Link
                  to="/AllPost"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <img className="nav-icon" src={postIcon} alt="post page" />
                </Link>
              </li>

              {/* profile link */}
              <li className="nav-item">
                <Link
                  to="/Profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  <img
                    className="nav-icon"
                    src={profileIcon}
                    alt="profile page"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Row>
    </Container>
  );
};
export default Navbar;
