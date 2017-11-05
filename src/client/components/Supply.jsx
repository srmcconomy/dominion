import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import Card from 'components/Card';
import { chooseSupply } from 'utils/input';

import styles from './supply.scss';

const cx = classnames.bind(styles);


@connect(
  (state, props) => ({
    data: state.game.supplies.get(props.title),
    selected: state.input && state.input.selectSupplies && state.input.selectSupplies.supplies && state.input.selectSupplies.supplies.has(props.title),
  }),
)
export default class Supply extends Component {
  onCardClick = () => {
    chooseSupply(this.props.data);
  }
  render() {
    const { cards, tokens, title, kingdom } = this.props.data;
    return (
      <div className={cx('supply')}>
        <div className={cx('card')}>
          {cards.size > 0 ? <Card data={cards.last()} supply small={this.props.small} selected={this.props.selected} onClick={this.onCardClick} /> : null}
        </div>
        <div className={cx('num')}>
          {cards.size}
        </div>
      </div>
    );
  }
}
