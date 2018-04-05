import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import AutoSizeText from 'components/AutoSizeText';
import AutoSizeBlock from 'components/AutoSizeBlock';

import styles from './styles.scss';

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

  renderValue() {
    const { supply, data: { value } } = this.props;
    if (value == null) return null;
    const ret = [
      <div key="left" className={cx('value', 'left')}>
        {value}
      </div>
    ];
    if (!supply) {
      ret.push(
        <div key="right" className={cx('value', 'right')}>
          {value}
        </div>
      );
    }
    return ret;
  }

  render() {
    const { style, selected, selectable, huge, small, supply, onClick, data, empty } = this.props;
    if (!data) {
      return (
        <div
          className={cx('card-border', { huge, full: true && !supply, supply, selected, selectable, small })}
          style={style}
          onClick={onClick}
          onContextMenu={this.onRightClick}
        >
          <div className={cx('card-container')}>
            <div className={cx('card', 'back')} />
          </div>
        </div>
      );
    }
    const image = empty ? this.props.data.image.empty : (supply ? this.props.data.image.small : this.props.data.image.normal);
    const { fullArt, types, title, description, set, cost } = data;
    return (
      <div
        className={cx('card-border', { huge, full: fullArt && !supply, supply, selected, selectable, small })}
        onClick={onClick}
        style={style}
        onContextMenu={this.onRightClick}
      >
        <div className={cx('card-container')}>
          <div
            className={cx('image')}
            style={{ backgroundImage: `url(/dist/${image})` }}
          />
          <div className={cx('card', [...types].map(type => type.toLowerCase()))}>
            <div className={cx('name')}>
              <AutoSizeText maxFontSize={fullArt ? 1.75 : 1.5}>{title}</AutoSizeText>
            </div>
            {!fullArt && !supply && (
              types.includes('Night') ?
                <div className={cx('descriptionWhite')}>
                  <AutoSizeBlock maxFontSize={1}>{description}</AutoSizeBlock>
                </div>
              :
                <div className={cx('description')}>
                  <AutoSizeBlock maxFontSize={1}>{description}</AutoSizeBlock>
                </div>
            )}
            <div className={cx('types')}>
              <AutoSizeText maxFontSize={1.3}>{[...types].join(' - ')}</AutoSizeText>
            </div>
            <div className={cx('icon', set)} />
            {this.renderValue()}
            <div className={cx('cost')}>
              {cost}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
