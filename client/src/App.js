import React from "react";
import SignIn from "./components/SignIn";


import SignUp from "./components/SignUp"
import Home from "./components/Home"
import FocusPage from "./components/FocusPage"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => console.log(res.express))
      .catch((err) => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            <Route exact path="/home">
              <Main />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/focuspage">
              <FocusPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
