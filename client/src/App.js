import React, { Component } from "react";
import "./App.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { Switch, Route, withRouter } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Homepage from "./Components/Homepage";
import Dashboard from "./Components/Dashboard";
import GenerateForm from "./Components/GenerateForm";
import CertificatesTable from "./Components/CertificatesTable";
import Upload from "./Components/Upload";

class App extends Component {
  state = {
    isLogedIn: false,
  };

  onLoginHandler = () => {
    console.log("onLoginHandler");
    this.setState({ isLogedIn: true });
  };

  onLogoutHandler = () => {
    console.log("onLogoutHandler");
    this.setState({ isLogedIn: false });
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="App" style={{ backgroundColor: "#fafafa" }}>
        <NavBar changeToLoggedOut={this.onLogoutHandler} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login">
            <SignIn changeToLoggedIn={this.onLoginHandler}></SignIn>
          </Route>

          <Route path="/signup">
            <SignUp changeToLoggedIn={this.onLoginHandler}></SignUp>
          </Route>
          <Route path="/generate-certificate" component={GenerateForm} />
          <Route path="/display/certificate/:id" component={Dashboard} />
          <Route
            path="/display/all/certificate"
            component={CertificatesTable}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
