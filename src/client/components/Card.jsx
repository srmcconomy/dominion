import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import styles from './card.scss';

const cx = classnames.bind(styles);
@connect(
  undefined,
  { lookAtCard: card => ({ type: 'look-at-card', card }) }
)
export default class Card extends Component {
  onRightClick = e => {
    e.preventDefault();
    this.props.lookAtCard(this.props.data);
  }

  render() {
    const { fullArt } = this.props.data;
    const { small, supply } = this.props;
    const image = supply ? this.props.data.image.small : this.props.data.image.normal;
    return (
      <div className={cx('card-border', { huge: this.props.huge, full: fullArt && !supply, supply, selected: this.props.selected, selectable: this.props.selectable, small })} onClick={this.props.onClick} style={this.props.style} onContextMenu={this.onRightClick}>
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
