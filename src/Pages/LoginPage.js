import React, { useState } from "react";
import Input from "../Components/Input";
import ButtonWithProgress from "../Components/ButtonWithProgress";

const LoadingPage = (props) => {
  //props
  const LoginPage = (props) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [apiError, setApiError] = useState(undefined);
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const onClickLogin = () => {
      setPendingApiCall(true);
      const body = {
        username,
        password,
      };
      props.actions
        .postLogin(body)
        .then((response) => {
          setPendingApiCall(false);
          //navigate to "/"
        })
        .catch((e) => {
          if (e.response) {
            setApiError(e.response.data.message);
            setPendingApiCall(false);
          }
        });
    };

    const onChangeUserName = (event) => {
      const value = event.target.value;
      setUserName(value);
      setApiError(undefined);
    };

    onChangePassword = (event) => {
      const value = event.target.value;
      setPassword(value);
      setApiError(undefined);
    };

    {
      //auto called when the state changed
      let disableSubmit = false;
      if (this.state.username === "") {
        disableSubmit = true;
      }
      if (this.state.password === "") {
        disableSubmit = true;
      }
      return (
        <div className="container">
          <h1 className="text-center">Login</h1>

          <div className="col-12 mb-3">
            <Input
              value={this.state.username}
              onChange={this.onChangeUserName}
              label="User Name"
              placeholder="Your User Name"
            />
          </div>

          <div className="col-12 mb-3">
            <Input
              value={this.state.password}
              onChange={this.onChangePassword}
              label="Password"
              placeholder="Your Password"
              type="password"
            />
          </div>

          <div className="text-center">
            {this.state.apiError && (
              <div className="col-12 mb-3">
                <div className="alert alert-danger">{this.state.apiError}</div>
              </div>
            )}
            <ButtonWithProgress
              showProgress={this.state.pendingApiCall}
              disabled={disableSubmit || this.state.pendingApiCall}
              text="Login"
              onClick={this.onClickLogin}
            />
          </div>
        </div>
      );
    }
  };

  // when we show the component without passing an action -> we don't receive an error
  LoginPage.defaultProps = {
    actions: {
      postLogin: () => new Promise((resolve, reject) => resolve({})),
    },
  };

  export default LoginPage;

  //export default usage:
  //import LoginPage from './Pages/LoginPage'

  //export class usage:
  //import {LoginPage} from './Pages/LoginPage'
};
