import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { doneChoosingCards, chooseOption } from 'utils/input';

import styles from './input.scss';

const cx = classnames.bind(styles);

const selectOption = i => () => {
  chooseOption(i);
};

@connect(
  state => ({
    selectCards: state.input && state.input.selectCards,
    selectOption: state.input && state.input.selectOption,
  }),
)
export default class Input extends Component {
  render() {
    const buttons = [];
    if (this.props.selectCards && this.props.selectCards.min === 0) {
      buttons.push(<button onClick={doneChoosingCards}>Done choosing cards</button>);
    }
    if (this.props.selectOption) {
      buttons.push(...this.props.selectOption.options.map((option, i) => <button onClick={selectOption(i)}>{option}</button>));
    }
    return (
      <div className={cx('input')}>
        {buttons}
      </div>
    );
  }
}
