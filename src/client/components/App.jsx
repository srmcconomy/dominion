import React, { Component } from 'react';
import { connect } from 'react-redux';
import Model from 'models/Model';
import Hand from './Hand';
import Card from './Card';
import Supplies from './Supplies';
import Input from './Input';

import './fonts.scss';

@connect(
  state => ({
    hand: state.game && state.game.hand,
    playArea: state.game && state.game.playArea,
    input: state.input,
    organizedSupplies: state.game && state.game.organizedSupplies,
    cardToShow: state.cardToShow,
    selectedCards: state.selectedCards,
  }),
  { hideCard: () => ({ type: 'look-at-card', card: null }) }
)
export default class App extends Component {
  render() {
    console.log(this.props.input);
    return (
      <div className="app">
        {this.props.organizedSupplies && <Supplies data={this.props.organizedSupplies} input={this.props.input && this.props.input.selectSupplies} /> }
        {this.props.input && this.props.input.selectCards && this.props.input.selectCards.from == null && <Hand data={[...this.props.input.selectCards.cards].map(id => Model.fromID(id))} selectCards={this.props.selectedCards} />}
        {this.props.input && this.props.input.message && <div>{this.props.input.message}</div>}
        <div style={{ display: 'flex', width: '100%' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {this.props.playArea ? <Hand data={this.props.playArea} small /> : null}
          </div>
          <Input />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {this.props.hand ? <Hand data={this.props.hand} input={this.props.input && this.props.input.selectCards} selectedCards={this.props.selectedCards} /> : null}
        </div>
        { this.props.cardToShow && (
          <div onClick={this.props.hideCard} style={{ zIndex: 100, top: 0, left: 0, position: 'absolute', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card data={this.props.cardToShow} huge />
          </div>
        )}
      </div>
    );
  }
}
