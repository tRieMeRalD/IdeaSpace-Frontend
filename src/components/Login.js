import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { loginUser, setAccId, setFullname } from "../actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      accountId: "",
      users: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    /* const { email, password } = this.state;

    axios.post("/api/auth/login", { email, password }).then(res => {
      this.props.history.push("/dashboard");
    }); */
    axios
      .get("/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));

    this.state.users.map(u => {
      if (u.email.trim() == this.state.email) {
        /* this.setState({ accountId: u.id }); */

        /* const userData = {
          email: this.state.email,
          password: this.state.password,
          accountId: this.state.accountId
        }; */

        this.props.setAccId(u.id);
        this.props.setFullname(u.fullname);
        console.log(this.state.accountId);
      }
      console.log(u.email);
      console.log(this.state.email);
      console.log(u.id);
    });

    const userData = {
      email: this.state.email,
      password: this.state.password
      /* accountId: this.state.accountId */
    };

    const authId = {
      accountId: this.state.accountId
    };

    this.props.loginUser(userData);
    /* this.props.setAccId(authId); */
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="container pt-5" style={{ marginBottom: "400px" }}>
        <form onSubmit={this.onSubmit} className="form-signin">
          <h1 className="h3 mb-3 display-4 text-center">
            Login into IdeaSpace
          </h1>

          <label for="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="inputEmail"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={this.onChange}
          />
          <label for="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="inputPassword"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={this.onChange}
          />
          <button
            className="btn btn-lg btn-primary btn-block mb-2"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <p className="lead mt-3">
          Don't have an account? <Link to="/signup">Sign up today!</Link>
        </p>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setAccId: PropTypes.func.isRequired,
  setFullname: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser, setAccId, setFullname }
)(Login);
