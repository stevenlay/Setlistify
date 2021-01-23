import React from "react";
import { Navbar, Button, Alignment } from "@blueprintjs/core";
import { connect } from "react-redux";
import Payments from "./Payments";
import CreditCounter from "./CreditCounter";

export const Header = ({ auth }) => {
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
          <CreditCounter credits={auth.credits} key="creditCounter" />,
          <Payments key="payments" />,
          <a href="/api/logout" key="logout">
            <Button minimal={true} text="Logout" />
          </a>,
        ];
    }
  };
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Setlistify</Navbar.Heading>
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
