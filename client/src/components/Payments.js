import React from "react";
import { Button } from "@blueprintjs/core";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

const Payments = ({ handleToken }) => {
  console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  return (
    <StripeCheckout
      name="Setlistify"
      description="Songlist credits"
      amount={0}
      token={(token) => handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
    >
      <Button minimial={true} intent="success" text="Buy Credits" />
    </StripeCheckout>
  );
};

export default connect(null, actions)(Payments);
