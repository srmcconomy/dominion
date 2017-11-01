import React, { Component } from 'react';
import styles from './card.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export default class Card extends Component {
  render() {
    const small = this.props.small || this.props.smaller;
    const { smaller } = this.props;
    return (
      <div className={cx('card-border', { selected: this.props.selected, small, smaller })} onClick={this.props.onClick}>
        <div className={cx('card-container')}>
          <div
            className={cx('image')}
            style={{ backgroundImage: `url(${this.props.data.image})` }}
          />
          <div className={cx('card', [...this.props.data.types].map(type => type.toLowerCase()))}>
            <div className={cx('name')}>
              <span>{this.props.data.title}</span>
            </div>
            {!small && (
              <div className={cx('description')}>
                <span>{this.props.data.description}</span>
              </div>
            )}
            <div className={cx('types')}>
              <span>{[...this.props.data.types].join('-')}</span>
            </div>
            <div className={cx('icon', this.props.data.set)} />
            {this.props.data.value != null && [
              <div key="left" className={cx('value', 'left')}>
                <span>{this.props.data.value}</span>
              </div>,
              !small && (
                <div key="right" className={cx('value', 'right')}>
                  <span>{this.props.data.value}</span>
                </div>
              ),
            ]}
            <div className={cx('cost')}>
              <span>{this.props.data.cost}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
