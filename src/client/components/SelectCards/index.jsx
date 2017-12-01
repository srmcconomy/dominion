import React from 'react';
import { connect } from 'react-redux';
import { toggleCardInResponse } from 'utils/input';

import CardList from 'components/CardList';

function SelectCards(props) {
  const { selectCards, selectedCards } = props;
  if (!selectCards) return null;
  const { from, cards } = selectCards;
  if (from != null) return null;
  return (
    <CardList
      data={cards}
      onCardClick={toggleCardInResponse}
      selectedCards={selectedCards}
      selectableCards={cards}
    />
  );
}

export default connect(
  state => ({
    selectCards: state.input.selectCards,
    selectedCards: state.selectedCards,
  }),
)(SelectCards);
