import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import Card from 'components/Card';

import Debt from 'components/Debt';
import VP from 'components/VP';

import styles from './styles.scss';

const cx = classnames.bind(styles);

function Player(props) {
  const { data: { name, deck, discardPile, coinTokens, debt, score, vpTokens } } = props;
  return (
    <div className={cx('player')}>
      <div className={cx('name')}>
        {name}
      </div>
      <div className={cx('piles')}>
        <div className={cx('score')}>
          {score < 0 ? <font color="purple">{score} VP</font> : <font color="green">{score} VP</font>}
          {vpTokens ? <div>{vpTokens}  <VP /></div> : null}
          {coinTokens ? <div>{coinTokens} Coin Token{coinTokens === 1 ? '' : 's'}</div> : null}
          {debt ? <div><Debt>{debt}</Debt></div> : null}
        </div>
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
    </div>
  );
}

export default connect(
  (state, props) => ({ data: state.game.players.get(props.id) }),
)(Player);
