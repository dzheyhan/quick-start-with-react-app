import React from "react";
import axios from "axios";
import moment from "moment";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.expiration = 20; //min
    this.id_token_key = "id_token";
    this.token_created_key = "token_created";

    this.state = {
      id_token: localStorage.getItem(this.id_token_key) || "",
      token_created: localStorage.getItem(this.token_created_key) || "",
      "expires_at in": 1,
    };

    this.appLogin = this.appLogin.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.singOut = this.singOut.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  appLogin(username, password) {
    const _this = this;
    const params = {
      username: username,
      password: password,
    };

    return axios.post("/auth/login", params).then((data) => {
      _this.setToken(data.data.id_token);
      return data;
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props || prevState !== this.state) {
      localStorage.setItem(this.id_token_key, this.state.id_token);
      localStorage.setItem(this.token_created_key, this.state.token_created);
    }
  }

  setToken(id_token) {
    this.setState({
      id_token: id_token,
      token_created: moment.now().toString(),
      "expires_at in": 1,
    });
  }

  getToken() {
    return this.state.id_token;
  }

  getTokenCreated() {
    return this.state.token_created;
  }

  singOut() {
    this.setState({
      id_token: "",
      token_created: "",
    });
  }

  isAuthenticated() {
    const token = this.getToken();
    return Boolean(token);
  }

  render() {
    const configObject = {
      ...this.state,
      appLogin: this.appLogin,
      singOut: this.singOut,
      isAuthenticated: this.isAuthenticated,
    };

    return (
      <AuthContext.Provider value={configObject} {...this.props}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthProvider, AuthContext };
