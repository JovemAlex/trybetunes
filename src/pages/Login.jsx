import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      button: true,
      loading: false,
      userCreated: false,
    };
  }

  handleChange = ({ target }) => {
    const three = 3;
    const { value } = target;
    this.setState({ name: value });
    if (value.length >= three) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  handleClick = async () => {
    this.setState({
      loading: true,
    });

    const { name } = this.state;
    await createUser({ name });

    this.setState({
      userCreated: true,
    });
  }

  render() {
    const { button, userCreated, loading } = this.state;
    return (
      <div data-testid="page-login">
        { userCreated && <Redirect to="/search" /> }
        { loading && <Loading /> }
        { !loading && (
          <div>
            <label htmlFor="inputName">
              Nome:
              <input
                type="text"
                name=""
                id="inputName"
                data-testid="login-name-input"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ button }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}
