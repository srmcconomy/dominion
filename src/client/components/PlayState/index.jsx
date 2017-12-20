import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import Coin from 'components/Coin';

import styles from './styles.scss';

const cx = classnames.bind(styles);

function PlayState({ data }) {
  if (!data) {
    return null;
  }
  const { actions, buys, money, potions, debt } = data;
  return (
    <div className={cx('play-state')}>
      <div>{actions} Action{actions === 1 ? '' : 's'}</div>
      <div>{buys} Buy{buys === 1 ? '' : 's'}</div>
      <div><Coin>{money}</Coin></div>
      {potions ? <div>{potions}</div> : null}
      {debt ? <div>{debt}</div> : null}
    </div>
  );
}

export default connect(
  state => ({ data: state.game.current }),
)(PlayState);
