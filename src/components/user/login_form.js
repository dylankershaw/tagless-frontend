import { Button, Form } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import React, { Component } from "react";
import { connect } from "react-redux";

import { loginUser } from "../../actions";

class LoginForm extends Component {
  // returns jsx for fields
  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input type="text" {...field.input} />
      </div>
    );
  }

  onSubmit(values) {
    this.props.loginUser(values);
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Username"
            name="username"
            component={this.renderField}
          />
          <Field
            label="Password"
            name="password"
            component={this.renderField}
          />
          <Button type="submit">Log In</Button>
        </Form>
      </div>
    );
  }
}

export default reduxForm({
  form: "LoginForm" // name of form, must be unique
})(connect(null, { loginUser })(LoginForm));