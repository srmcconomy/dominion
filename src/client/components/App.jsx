import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import Model from 'models/Model';
import Hand from './Hand';
import Card from './Card';
import Supplies from './Supplies';
import Input from './Input';

import styles from './app.scss';
import './fonts.scss';

const cx = classnames.bind(styles);

@connect(
  state => ({
    hand: state.game && state.game.hand,
    playArea: state.game && state.game.playArea,
    selectCards: state.input && state.input.selectCards,
    selectSupplies: state.input && state.input.selectSupplies,
    message: state.input && state.input.message,
    organizedSupplies: state.game && state.game.organizedSupplies,
    cardToShow: state.cardToShow,
    selectedCards: state.selectedCards,
    log: state.log,
  }),
  { hideCard: () => ({ type: 'look-at-card', card: null }) }
)
export default class App extends Component {
  render() {
    return (
      <div className={cx('app')}>
        <div className={cx('game')}>
          {this.props.organizedSupplies && <Supplies data={this.props.organizedSupplies} input={this.props.selectSupplies} /> }
          {this.props.selectCards && this.props.selectCards.from == null && <Hand data={[...this.props.selectCards.cards].map(id => Model.fromID(id))} selectCards={this.props.selectedCards} />}
          {this.props.message && <div>{this.props.message}</div>}
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {this.props.playArea ? <Hand data={this.props.playArea} small /> : null}
            </div>
            <Input />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {this.props.hand ? <Hand data={this.props.hand} input={this.props.selectCards} selectedCards={this.props.selectedCards} /> : null}
          </div>
          { this.props.cardToShow && (
            <div onClick={this.props.hideCard} style={{ zIndex: 100, top: 0, left: 0, position: 'absolute', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Card data={this.props.cardToShow} huge />
            </div>
          )}
        </div>
        <div className={cx('log')}>
          {this.props.log.map(i => <div>{i}</div>)}
        </div>
      </div>
    );
  }
}
