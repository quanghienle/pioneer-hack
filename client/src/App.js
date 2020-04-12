import React from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp"
import Main from "./components/Main"
import FocusPage from "./components/FocusPage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  SAMPLE_SERVER_BASE_URL,
  API_KEY,
  SESSION_ID,
  TOKEN,
  PROVIDER_TOKEN
} from './components/config';



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
    const credentials = {
              apiKey: API_KEY,
              sessionId: SESSION_ID,
              token: TOKEN,
              providerToken: PROVIDER_TOKEN
              }; 
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
              <FocusPage credentials={credentials} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
