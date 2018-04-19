import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import SignupForm from '../forms/SignupForm';
import { signup } from '../../actions/users';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(data) {
    return this.props.signup(data).then(() => this.props.history.push('/dashboard'));
  }

  render() {
    return (
      <div>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signup }, dispatch);
}

export default connect(null, mapDispatchToProps)(SignupPage);