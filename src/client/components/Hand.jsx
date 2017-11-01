import React, { Component } from 'react';
import classnames from 'classnames/bind';

import socket from 'utils/socket';
import Card from 'components/Card';
import styles from './hand.scss';

const cx = classnames.bind(styles);

export default class Hand extends Component {
  onCardClick = card => () => {
    if (this.props.input.cards.has(card.id)) {
      if (this.props.input.max === 1) {
        socket.respond([card.id]);
      }
    }
  }

  render() {
    return (
      <div className={cx('hand')}>
        {this.props.data.map((card, i) => (
          <Card
            key={card.id}
            data={card}
            selected={this.props.input && this.props.input.cards && this.props.input.cards.has(card.id)}
            onClick={this.onCardClick(card)}
          />
        ))}
      </div>
    );
  }
}
