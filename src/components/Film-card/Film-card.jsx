import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Tag, Typography, Rate } from 'antd';
import formatDate from '../Utils/Format-date';
import 'antd/dist/antd.css';
import formatPost from '../Utils/Format-post';
import './style.css';
import { Consumer } from '../Api-services/Api-context';

export default class FilmCard extends Component {
  static propTypes = {
    onRate: PropTypes.func.isRequired,
    overview: PropTypes.string,
    title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    rating: PropTypes.number,
    generate_ids: PropTypes.instanceOf(Array).isRequired,
    cardId: PropTypes.number.isRequired,
  };

  static defaultProps = {
    overview: 'Nothing to say about it',
    title: 'Film Card',
    release_date: new Date().toDateString(),
    vote_average: 0,
    rating: 0,
  };

  postLength = 160;

  genreColors = {
    28: 'magenta',
    12: 'red',
    16: 'volcano',
    35: 'orange',
    80: 'gold',
    99: 'lime',
    18: 'green',
    10751: 'cyan',
    14: 'blue',
    36: 'geekblue',
    27: 'purple',
    10402: 'tan',
    9648: 'teal',
    10749: 'rosybrown',
    878: 'olive',
    10770: 'plum',
    53: 'foresrgreen',
    10752: 'indigo',
    37: 'navy',
  };

  getRateColor = rating => {
    let borderColor = '#E90000';
    if (rating >= 3 && rating < 5) borderColor = '#E97E00';
    else if (rating >= 5 && rating < 7) borderColor = '#E9D100';
    else if (rating >= 7) borderColor = '#66E900';
    return { borderColor };
  };

  getTagColor = id => {
    return this.genreColors[id];
  };

  render() {
    const { Title, Text } = Typography;
    const bodyStyle = { padding: '8px 12px' };
    const {
      onRate,
      title,
      overview,
      release_date: date,
      vote_average: avgRating,
      rating = 0,
      generate_ids: generateIDs,
      cardId,
    } = this.props;

    const rateNumber = avgRating.toFixed(1);
    const rateStyle = this.getRateColor(rateNumber);
    const post = formatPost(overview, this.postLength);
    const formattedDate = formatDate(date);

    return (
      <Card className="card" bodyStyle={bodyStyle}>
        <Title className="card-title" level={4}>
          {title}
        </Title>
        <span className="rate-number" style={rateStyle}>
          {rateNumber}
        </span>
        <Text type="danger">{formattedDate}</Text>
        <br />
        <Consumer>
          {generateRes => {
            const list =
              generateIDs &&
              generateIDs.map(id => {
                const genre = generateRes && generateRes.find(elem => elem.id === id).name;
                const tagColor = this.getTagColor(id);
                return (
                  <Tag key={id} className="genre-label" color={tagColor}>
                    {genre}
                  </Tag>
                );
              });
            return <div key={cardId}>{list}</div>;
          }}
        </Consumer>
        <br />
        <Text>{post}</Text>
        <br />
        <Rate className="rate-scale" allowHalf count="10" defaultValue={rating} onChange={onRate} />
      </Card>
    );
  }
}
