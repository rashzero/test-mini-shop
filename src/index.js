import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import Products from "./containers/Products";
import SuccessfulPurchase from "./containers/SuccessfulPurchase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/done" exact component={SuccessfulPurchase} />
        </Switch>
      </Router>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>{<App />}</Provider>,
  document.getElementById("container")
);
