import _ from "lodash";
import React from "react";
import { Form, Button } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      this.props.submit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) {
      errors.email = "Invalid Email!";
    }

    if (!data.password) {
      errors.password = "Can't be blank";
    }

    return errors;
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field error={!!this.state.errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            value={this.state.data.email}
            onChange={this.onChange}
          />
        </Form.Field>

        {this.state.errors.email && (
          <InlineError text={this.state.errors.email} />
        )}

        <Form.Field error={!!this.state.errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Secure one"
            value={this.state.data.password}
            onChange={this.onChange}
          />
        </Form.Field>

        {this.state.errors.password && (
          <InlineError text={this.state.errors.password} />
        )}

        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
