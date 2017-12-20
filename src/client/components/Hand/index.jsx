import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import CardList from 'components/CardList';
import { toggleCardInResponse } from 'utils/input';

import styles from './styles.scss';

const cx = classnames.bind(styles);


function Hand({ hand, selectableCards, selectedCards }) {
  return (
    <div className={cx('hand')}>
      <CardList
        data={hand}
        onCardClick={toggleCardInResponse}
        selectedCards={selectedCards}
        selectableCards={selectableCards}
      />
    </div>
  );
}

export default connect(
  state => ({
    hand: state.game.self.hand,
    selectableCards: state.input.selectCards && state.input.selectCards.cards,
    selectedCards: state.selectedCards,
  }),
)(Hand);
