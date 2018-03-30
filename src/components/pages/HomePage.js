import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

const HomePage = (props) => (
  <div>
    <h1>Home Page</h1>
    { props.isAuthenticated ? <button onClick={() => props.logout()}>Logout</button> : <Link to="/login">Login</Link> }
  </div>
);

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    logout: PropTypes.func.isRequired
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
