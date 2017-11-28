import React from 'react';
import { connect } from 'react-redux';

import CardList from 'components/CardList';

function PlayArea({ playArea }) {
  return playArea && (
    <CardList data={playArea} small />
  );
}

export default connect(
  state => ({ playArea: state.game.playArea })
)(PlayArea);
