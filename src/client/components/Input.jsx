import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import { doneChoosingCards, chooseOption } from 'utils/input';
import Button from 'components/Button';

import styles from './input.scss';

const cx = classnames.bind(styles);

const selectOption = i => () => {
  chooseOption(i);
};

@connect(
  state => ({
    selectCards: state.input && state.input.selectCards,
    selectOption: state.input && state.input.selectOption,
    selectedCards: state.selectedCards,
  }),
)
export default class Input extends Component {
  render() {
    const buttons = [];
    if (this.props.selectCards && this.props.selectedCards && this.props.selectedCards.size >= this.props.selectCards.min) {
      buttons.push(<Button onClick={doneChoosingCards}>Done choosing cards</Button>);
    }
    if (this.props.selectOption) {
      buttons.push(...this.props.selectOption.choices.map((option, i) => <Button onClick={selectOption(i)}>{option}</Button>));
    }
    return (
      <div className={cx('input')}>
        {buttons}
      </div>
    );
  }
}
