import React from 'react';
import { connect } from 'react-redux';
import Player from 'components/Player';


function Players({ ids }) {
  return ids.map(id => <Player key={id} id={id} />);
}

export default connect(
  state => ({ ids: state.game.players.keySeq() })
)(Players);
