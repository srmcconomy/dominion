import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import Card from 'components/Card';

import styles from './styles.scss';

const cx = classnames.bind(styles);

function Player(props) {
  const { data: { name, deck, discardPile } } = props;
  return (
    <div className={cx('player')}>
      <div className={cx('piles')}>
        <div className={cx('deck-container')}>
          <div className={cx('card')}>
            <Card />
          </div>
          <div className={cx('deck-size')}>
            {deck.size || 0}
          </div>
        </div>
        <div className={cx('card')}>
          {discardPile && <Card data={discardPile} />}
        </div>
      </div>
      <div className={cx('name')}>
        {name}
      </div>
    </div>
  );
}

export default connect(
  (state, props) => ({ data: state.game.players.get(props.id) }),
)(Player);
