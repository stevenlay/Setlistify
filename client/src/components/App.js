import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";

const App = ({ fetchUser }) => {
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default connect(null, actions)(App);
