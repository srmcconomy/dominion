import React, { Component } from 'react';
import styles from './card.css';
import classnames from '../util/cx';
const cx = classnames(styles);

export default class Card extends Component {
  render() {
    return (
      <div className={cx('card-background')} {...this.props}>
        <div className={cx('card', ...this.props.data.types.map(type => type.toLowerCase()))}>
          <div className={cx('name')}>
            {this.props.data.name}
          </div>
          <div
            className={cx('image')}
            style={{ backgroundImage: `url(${this.props.data.image})` }}
          />
          <div className={cx('description')}>
            {this.props.data.description}
          </div>
          <div className={cx('cost')}>
            {this.props.data.cost}
          </div>
          <div className={cx('icon', this.props.data.set)} />
        </div>
      </div>
    );
  }
}
