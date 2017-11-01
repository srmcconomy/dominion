import React, { Component } from 'react';
import { connect } from 'react-redux';
import Hand from './Hand';
import Supplies from './Supplies';

import './fonts.scss';

@connect(
  state => ({
    hand: state.game && state.game.hand,
    playArea: state.game && state.game.playArea,
    input: state.input,
    organizedSupplies: state.game && state.game.organizedSupplies,
  })
)
export default class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.organizedSupplies && <Supplies data={this.props.organizedSupplies} input={this.props.input} /> }
        {this.props.playArea ? <Hand data={this.props.playArea} /> : null}
        {this.props.hand ? <Hand data={this.props.hand} input={this.props.input} /> : null}
      </div>
    );
  }
}
