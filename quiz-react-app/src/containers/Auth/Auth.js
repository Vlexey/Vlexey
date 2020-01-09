import React, { Component } from "react";
import "./Auth.scss";
import { Button } from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import axios from 'axios'


class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Type correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Type correct password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4PFWzeWyExQLG3T89A2jSBSAx9Z6TeHk', authData)
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  };
  signUpHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };
    try {
      const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4PFWzeWyExQLG3T89A2jSBSAx9Z6TeHk', authData)
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  };
  submitHandler = e => {
    e.preventDefault();
  };
  validateControl(value, validation) {
    if (!validation) {
      return true
    }
    let isValid = true
    if(validation.required) {
      isValid = value.trim() !== '' && isValid
    }
    if(validation.email) {
      isValid = is.email(value) && isValid
    }
    if(validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }
  onChangeHandler = (e, cName) => {

    const formControls = {...this.state.formControls}
    const contr = { ...formControls[cName] }

    contr.value = e.target.value
    contr.touched = true
    contr.valid = this.validateControl(contr.value, contr.validation)
    formControls[cName] = contr

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({formControls, isFormValid})
  }
  renderInputs = () => {
    return Object.keys(this.state.formControls).map((cName, ind) => {
      const contr = this.state.formControls[cName]
      return (
          <Input
              key={cName + ind}
              type={contr.type}
              value={contr.value}
              label={contr.label}
              valid={contr.valid}
              touched={contr.touched}
              errorMessage={contr.errorMessage}
              shouldValidate={!!contr.validation}
              onChange={ (e)=> this.onChangeHandler(e, cName) }
          />
      )
    })
  }

  render() {
    return (
      <div className="Auth">
        <div>
          <h1>Auth: </h1>
          <form action="" onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <div className="btn-wrapper">
              <Button type="submit"
                      cls="success"
                      disabled={!this.state.isFormValid}
                      onClick={this.loginHandler}>
                Login
              </Button>
              <br />
              <Button type="submit"
                      disabled={!this.state.isFormValid}
                      cls="success"
                      onClick={this.signUpHandler}>
                SignUp
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
