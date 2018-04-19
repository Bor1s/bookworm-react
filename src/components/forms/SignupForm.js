import React from "react";
import { Form, Button, Message } from "semantic-ui-react";
import PropTypes from "prop-types";
import Validator from "validator";
import InlineError from "../messages/InlineError";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {
      data: {
        email: "",
        password: "",
        password_confirmation: ""
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

    if (!data.password_confirmation) {
      errors.password_confirmation = "Can't be blank";
    }

    if (data.password != data.password_confirmation) {
      errors.password_confirmation = "Does not match password";
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

        <Form.Field error={!!errors.password_confirmation}>
          <label htmlFor="password_confirmation">
            Password Confirmation
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              placeholder="Must match password"
              value={data.password_confirmation}
              onChange={this.onChange}
            />
          </label>
        </Form.Field>

        {this.state.errors.password_confirmation && <InlineError text={errors.password_confirmation} />}

        <Button primary>Sign Up</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
