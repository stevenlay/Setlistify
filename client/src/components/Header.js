import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button, Alignment } from "@blueprintjs/core";
import { connect } from "react-redux";
import Payments from "./Payments";
import CreditCounter from "./CreditCounter";

const Header = ({ auth }) => {
  const renderContent = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <a href="/auth/spotify" key="login">
            <Button intent="success" text="Login with Spotify" />
          </a>
        );
      default:
        return [
          <Payments key="payments" />,
          <CreditCounter credits={auth.credits} key="creditCounter" />,
          <a href="/api/logout" key="logout">
            <Button minimal="true" text="Logout" />
          </a>,
        ];
    }
  };
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <Link to={"/"} className="logo">
            Setlistify
          </Link>
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Navbar.Divider />
        {renderContent()}
      </Navbar.Group>
    </Navbar>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
