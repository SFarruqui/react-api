// Navbar Component
import React from "react";
import { Nav, NavLink, NavMenu } from "./navbarelements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/" activeStyle>
            About
          </NavLink>
          <NavLink to="/dog" activeStyle>
            Dog
          </NavLink>
          <NavLink to="/cat" activeStyle>
            Cat
          </NavLink>
          <NavLink to="/bird" activeStyle>
            Bird
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
