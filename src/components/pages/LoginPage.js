import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(data) {
    return this.props.login(data).then(() => this.props.history.push("/dashboard"));
  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

// This IS IMPORTANT stuff!
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

// function mapStateToProps(state) {
//   return {};
// }

// First parameter to connect is: mapStateToProps.
// In our case we do not need anything from store so
// it is null.
// Second one is mapDispatchToProps - a set of functions we are going to dispath.
// In our case it is only 'login' function.
export default connect(null, mapDispatchToProps)(LoginPage);
