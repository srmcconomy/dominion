import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import Supplies from 'components/Supplies';
import SelectCards from 'components/SelectCards';
import PlayArea from 'components/PlayArea';
import Input from 'components/Input';
import Card from 'components/Card';
import Hand from 'components/Hand';

import styles from './styles.scss';

const cx = classnames.bind(styles);

function Game({ game, message, cardToShow, hideCard }) {
  if (!game) {
    return null;
  }
  return (
    <div className={cx('game')}>
      <div className={cx('top-area')}>
        <div className={cx('supplies-container')}>
          <Supplies />
        </div>
        <div className={cx('select-cards-container')}>
          <SelectCards />
        </div>
      </div>
      <div className={cx('center-area')}>
        <div className={cx('play-area-container')}>
          <PlayArea />
        </div>
        <div className={cx('input-container')}>
          <div className={cx('message')}>{message}</div>
          <Input />
        </div>
      </div>
      <div className={cx('hand-container')}>
        <Hand />
      </div>
      { cardToShow && (
        <div onClick={hideCard} className={cx('card-to-show')}>
          <Card data={cardToShow} huge />
        </div>
      )}
    </div>
  );
}

export default connect(
  state => ({ game: state.game, message: state.input.message, cardToShow: state.cardToShow }),
  { hideCard: () => ({ type: 'look-at-card', card: null }) },
)(Game);
