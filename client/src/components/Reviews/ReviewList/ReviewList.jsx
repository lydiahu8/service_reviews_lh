/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Button, Select, Reviews, Title, Starbox, Space,
} from './ReviewList.style';

const axios = require('axios');

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewInfo: [],
      done: false,
    };
  }

  componentDidMount() {
    const fullUrl = document.URL;
    const urlArray = fullUrl.split('/');
    const lastSegment = urlArray[urlArray.length - 1] || 1;
    axios.get(`/api/reviews/${lastSegment}`)
      .then((res) => {
        this.setState({
          reviewInfo: res.data.rows,
          done: true,
        });
      });
  }

  render() {
    const {
      reviewInfo,
    } = this.state;

    return (
      <div>
        <Title>Showing 1-3 of 453 reviews</Title>
        <div>
          <Select name="reviews">
            <option value="Top Reviews">Top Reviews</option>
            <option value="Most recent">Most recent</option>
          </Select>
        </div>
        <div>
          {
            reviewInfo.map(review => (
              <Review review={review} key={review.id} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default ReviewList;

const Review = (props) => {
  const {
    username, headline, review, helpful, created,
  } = props.review;
  return (
    <Reviews>
      <div>
        <Starbox>
          <img
            src="https://s3.amazonaws.com/product-reviews-hr110/Icons/avatar.png"
            height="30px"
            width="30px"
            alt="avatar"
            max-width="100%"
            display="block"
          />
          {username}
        </Starbox>
        <Starbox>
          <img src="https://s3.amazonaws.com/product-reviews-hr110/Icons/stars.png" alt="stars" height="25px" />
          <Title>{headline}</Title>
        </Starbox>
        <div> {created} </div>
        <p width="auto">
          {review}
        </p>
        <div>
          {helpful} people found this helpful
        </div>
        <Space>
          <Button>Helpful</Button> |
          <a href="#top" style={{ textDecoration: 'none', color: '#7a7a7a' }}>Comment</a> |
          <a href="#top" style={{ textDecoration: 'none', color: '#7a7a7a' }}>Report abuse</a>
        </Space>
      </div>
    </Reviews>
  );
};
