import React from "react";
import axiosInstance from "../axiosApi";
import { AuthContext } from "./AuthProvider";

const UserContext = React.createContext();

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
};

class UserProvider extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = initialState;

    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.singOutUser = this.singOutUser.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.isAuthenticated() && this.state.email === "") {
      this.setCurrentUser();
    }

    if (!this.context.isAuthenticated() && this.state.email) {
      this.singOutUser();
    }
  }

  singOutUser() {
    this.setState(initialState);
  }

  setCurrentUser() {
    const _this = this;

    axiosInstance
      .get("/user", {})
      .then((data) =>
        _this.setState({
          email: data.data.email,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
        })
      )
      .catch((error) => console.log("Error", error.response));
  }

  render() {
    const configObject = {
      ...this.state,
      setCurrentUser: this.setCurrentUser,
    };
    return (
      <UserContext.Provider value={configObject} {...this.props}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export { UserProvider, UserContext };
