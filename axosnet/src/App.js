import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import "./App.css";

const loading = () => <div className="animated fadeIn pt-3 text-center">Cargando...</div>;

// Pages
const Home = React.lazy(() => import("./pages/home/index.js"));
const Login = React.lazy(() => import("./pages/login/index.js"));
const Signup = React.lazy(() => import("./pages/signup/index.js"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/auth" name="Login" render={props => <Login {...props} />} />
            <Route exact path="/signup" name="Signup" render={props => <Signup {...props} />} />
            <PrivateRoute path="/" name="Home" component={Home} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
