/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography } from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import noImg from './no_image.png';
import FilmCard from '../Film-card/Film-card';

export default class SearchResults extends Component {
  static propTypes = {
    posterUrl: PropTypes.string.isRequired,
    onRate: PropTypes.func.isRequired,
    rated: PropTypes.instanceOf(Map).isRequired,
    data: PropTypes.instanceOf(Object).isRequired,
  };

  createCard(item) {
    const { Grid } = Card;
    const { posterUrl, onRate, rated } = this.props;
    const { id, title, poster_path: poster, rating, ...props } = item;

    let img = `${posterUrl}${poster}`;
    if (img.includes('null')) img = noImg;

    const currRating = rated ? rated.get(id) : rating;

    return (
      <Grid key={id} className="grid" hoverable>
        <img className="poster" src={img} alt={title} />
        <FilmCard title={title} onRate={value => onRate(id, value)} rating={currRating} cardId={id} {...props} />
      </Grid>
    );
  }

  render() {
    const { Title } = Typography;

    const { data } = this.props;
    let cards;
    cards = data.map(item => {
      return this.createCard(item);
    });
    if (!data.length) {
      cards = (
        <Title className="not-found-message" level={1}>
          No results found
        </Title>
      );
    }

    return <div className="container">{cards}</div>;
  }
}
