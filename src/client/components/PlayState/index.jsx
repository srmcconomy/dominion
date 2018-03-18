import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import Coin from 'components/Coin';
import Debt from 'components/Debt';
import Potion from 'components/Potion';

import styles from './styles.scss';

const cx = classnames.bind(styles);

function PlayState({ data }) {
  if (!data) {
    return null;
  }
  const { actions, buys, money, coinTokens, potion, debt } = data;
  return (
    <div className={cx('play-state')}>
      <div>{actions} Action{actions === 1 ? '' : 's'}</div>
      <div>{buys} Buy{buys === 1 ? '' : 's'}</div>
      <div><Coin>{money}</Coin></div>
      {coinTokens ? <div>{coinTokens} Coin Token{coinTokens === 1 ? '' : 's'}</div> : null}
      {potion ? <div><Potion>{potion}</Potion></div> : null}
      {debt ? <div><Debt>{debt}</Debt></div> : null}
    </div>
  );
}

export default connect(
  state => ({ data: state.game.current }),
)(PlayState);
