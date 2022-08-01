import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component">
        { !user && <Loading /> }
        { user && (
          <p data-testid="header-user-name"><strong>{ user.name }</strong></p>
        ) }
      </header>
    );
  }
}
