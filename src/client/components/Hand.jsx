import React, { Component } from 'react';
import classnames from 'classnames/bind';

import { toggleCardInResponse } from 'utils/input';
import Card from 'components/Card';
import styles from './hand.scss';

const cx = classnames.bind(styles);

export default class Hand extends Component {
  onCardClick = card => () => {
    toggleCardInResponse(card);
  }

  render() {
    return (
      <div className={cx('hand', { small: this.props.small })} style={{ maxWidth: `${(this.props.small ? 12 : 18) * this.props.data.size}em` }}>
        {this.props.data.map((card, i) => (
          <Card
            key={card.id}
            data={card}
            selectable={this.props.input && this.props.input.cards && this.props.input.cards.has(card.id)}
            selected={this.props.selectedCards && this.props.selectedCards.has(card.id)}
            onClick={this.onCardClick(card)}
            style={{ marginLeft: `${100 * (i / this.props.data.size)}%` }}
            small={this.props.small}
          />
        ))}
      </div>
    );
  }
}
