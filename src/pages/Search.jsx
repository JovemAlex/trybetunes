import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      button: true,
    };
  }

  handleChange = ({ target }) => {
    const two = 2;
    const { value } = target;
    if (value.length >= two) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  render() {
    const { button } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        <form action="">
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ button }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
