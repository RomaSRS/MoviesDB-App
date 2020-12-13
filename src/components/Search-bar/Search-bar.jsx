/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import { debounce } from 'lodash';

export default class SearchBar extends Component {
  static propTypes = {
    request: PropTypes.string,
    onReload: PropTypes.func.isRequired,
  };

  static defaultProps = {
    request: '',
  };

  state = { value: this.props.request };

  onReload = debounce(this.props.onReload, 2000, { leading: false, trailing: true });

  onLabelChange = evt => {
    let { value } = evt.target;
    this.setState({
      value,
    });
    value = value.trim();

    this.onReload(value);
  };

  render() {
    const { value } = this.state;
    const { Search } = Input;
    return (
      <Search className="searchBar" onChange={this.onLabelChange} value={value} placeholder="type here to search" />
    );
  }
}
