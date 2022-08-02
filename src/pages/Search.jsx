import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      prevSearch: '',
      button: true,
      response: [],
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const two = 2;
    const { value } = target;
    // console.log(value);
    this.setState({
      search: value,
      prevSearch: value,
    });
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

  handleClick = async (event) => {
    event.preventDefault();
    this.setState({
      search: '',
      loading: true,
    });
    const { prevSearch } = this.state;
    console.log(prevSearch);
    const response = await searchAlbumsAPI(prevSearch);
    this.setState({
      response,
      loading: false,
    });
    console.log(response);
  }

  render() {
    const {
      search,
      prevSearch,
      button,
      response,
      loading,
    } = this.state;
    return (
      <div data-testid="page-search">
        { loading && <Loading /> }
        { !loading && (
          <div>
            <Header />
            <form action="">
              <input
                type="text"
                value={ search }
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                onChange={ this.handleChange }
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ button }
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
            { prevSearch.length > 0 && response.length > 0
              ? <h3>{`Resultado de álbuns de: ${prevSearch}`}</h3>
              : <h3>Nenhum álbum foi encontrado</h3> }
            { response.map((e) => <AlbumCard key={ e.collectionName } { ...e } />) }
          </div>
        ) }
      </div>
    );
  }
}
