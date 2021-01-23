import React from "react";
import { Button } from "@blueprintjs/core";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

const Payments = () => {
  return (
    <StripeCheckout
      name="Setlistify"
      description="Songlist credits"
      amount={0}
      token={(token) => this.props.handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <Button minimial={true} intent="success" text="Buy Credits" />
    </StripeCheckout>
  );
};

export default connect(null, actions)(Payments);
