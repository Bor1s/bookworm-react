import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      data: {
        email: "",
        password: ""
      },
      loading: false,
      errors: {}
    };
  }

  onChange(e) {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  onSubmit() {
    const errors = this.validate(this.state.data);
    this.setState({ errors: errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch(err => {
        this.setState({ errors: err.response.data, loading: false });
      });
    }
  }

  validate(data) {
    const errors = {};
    if (!Validator.isEmail(data.email)) {
      errors.email = "Invalid Email!";
    }

    if (!data.password) {
      errors.password = "Can't be blank";
    }

    return errors;
  }

  render() {
    const { errors, data, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.message && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.message}</p>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              value={data.email}
              onChange={this.onChange}
            />
          </label>
        </Form.Field>

        {this.state.errors.email && <InlineError text={errors.email} />}

        <Form.Field error={!!errors.password}>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Secure one"
              value={data.password}
              onChange={this.onChange}
            />
          </label>
        </Form.Field>

        {this.state.errors.password && <InlineError text={errors.password} />}

        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
