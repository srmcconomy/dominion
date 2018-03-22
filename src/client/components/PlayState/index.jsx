import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import Coin from 'components/Coin';
import Debt from 'components/Debt';
import PotionImg from 'components/Potion';
import VP from 'components/VP';

import styles from './styles.scss';

const cx = classnames.bind(styles);

function PlayState({ data }) {
  if (!data) {
    return null;
  }
  const { actions, buys, money, coinTokens, potion, debt, vpTokens } = data;
  return (
    <div className={cx('play-state')}>
      <div>{actions} Action{actions === 1 ? '' : 's'}</div>
      <div>{buys} Buy{buys === 1 ? '' : 's'}</div>
      <div><Coin>{money}</Coin></div>
      {coinTokens ? <div>{coinTokens} Coin Token{coinTokens === 1 ? '' : 's'}</div> : null}
      {potion ? <div><PotionImg>{potion}</PotionImg></div> : null}
      {debt ? <div><Debt>{debt}</Debt></div> : null}
      {vpTokens ? <div><VP /> {vpTokens}</div> : null}
    </div>
  );
}

export default connect(
  state => ({ data: state.game.current }),
)(PlayState);
