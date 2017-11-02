import React, { Component } from 'react';
import styles from './card.scss';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

export default class Card extends Component {
  render() {
    const { fullArt } = this.props.data;
    const { small, supply } = this.props;
    const image = supply ? this.props.data.image.small : this.props.data.image.normal;
    return (
      <div className={cx('card-border', { full: fullArt, supply, selected: this.props.selected, small })} onClick={this.props.onClick}>
        <div className={cx('card-container')}>
          <div
            className={cx('image')}
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className={cx('card', [...this.props.data.types].map(type => type.toLowerCase()))}>
            <div className={cx('name')}>
              <span>{this.props.data.title}</span>
            </div>
            {!fullArt && !supply && (
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
                {this.props.data.value}
              </div>,
              !supply && (
                <div key="right" className={cx('value', 'right')}>
                  {this.props.data.value}
                </div>
              ),
            ]}
            <div className={cx('cost')}>
              {this.props.data.cost}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
