import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Spin, Alert, Pagination } from 'antd';
import './style.css';
import { Provider } from '../Api-services/Api-context';

import SearchResults from '../Search-results/Search-results';
import Api from '../Api-services/Api';
import SearchBar from '../Search-bar/Search-bar';
import MenuBar from '../Menu/Menu';

export default class App extends Component {
  state = {
    data: [],
    request: 'Return',
    totalPages: null,
    page: 1,
    loading: true,
    error: false,
    mode: 'search',
  };

  ratedMovies = new Map();

  api = new Api();

  posterUrl = this.api.apiPostersUrlBase;

  componentDidMount() {
    const { request, page } = this.state;
    this.updateMoviesList(request, page);
    this.api.getGenres().then(res => {
      this.generateRes = res.generateRes;
      this.generateRes = null;
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { request, page, mode } = this.state;
    if (mode === 'search') {
      if (prevState.request === request && prevState.page === page && prevState.mode === mode) return;
      this.updateMoviesList(request, page);
    } else if (mode === 'rated' && prevState.mode !== mode) {
      this.updateRatedMoviesList();
    }
  }

  onError() {
    this.setState({
      loading: false,
      error: true,
    });
  }

  changePage = page => {
    this.setState({
      page,
    });
  };

  updateSearchStr = request => {
    if (request === '') return;
    this.setState({
      request,
      page: 1,
    });
  };

  toggleMenu = key => {
    this.setState({
      mode: key,
    });
  };

  rateMovie = (id, rating) => {
    this.api.rateMovie(id, rating);
    this.ratedMovies.set(id, rating);
  };

  updateMoviesList(str, page) {
    this.setState({
      loading: true,
    });

    this.api
      .searchMovies(str, page)
      .then(res => {
        this.setState({
          data: res.results,
          totalPages: res.total_pages,
          page,
          loading: false,
          error: false,
        });
      })
      .catch(() => this.onError());
  }

  updateRatedMoviesList() {
    this.setState({
      loading: true,
    });

    this.api
      .getRatedMovies()
      .then(res => {
        this.setState({
          data: res.results,
          totalPages: res.total_pages,
          loading: false,
          error: false,
        });
      })
      .catch(() => this.onError());
  }

  render() {
    const { data, loading, error, totalPages, page, mode, request } = this.state;
    const { ratedMovies } = this;
    const hasData = !(loading || error);
    const rated = mode === 'search' ? ratedMovies : null;
    const errorMessage = error ? <Alert type="error" message="Something went wrong. Try again later" /> : null;
    const spinner = loading ? <Spin className="spin" size="large" /> : null;
    const content = hasData ? (
      <SearchResults data={data} onRate={this.rateMovie} posterUrl={this.posterUrl} rated={rated} />
    ) : null;

    const searchBar =
      mode === 'search' ? (
        <SearchBar className="search-bar" request={request} onReload={value => this.updateSearchStr(value)} />
      ) : null;

    const pagination = hasData ? (
      <Pagination
        current={page}
        defaultPageSize={1}
        showSizeChanger={false}
        hideOnSinglePage
        onChange={value => this.changePage(value)}
        total={totalPages}
      />
    ) : null;

    return (
      <Provider value={this.generateRes}>
        <div>
          <MenuBar mode={mode} onClickMenu={this.toggleMenu} />
          {searchBar}
          <Layout className="layout">
            {errorMessage}
            {spinner}
            {content}
          </Layout>
          {pagination}
        </div>
      </Provider>
    );
  }
}
