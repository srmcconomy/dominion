import React, { Component } from 'react';
import classnames from 'classnames/bind';
import Game from 'components/Game';
import Log from 'components/Log';

import styles from './styles.scss';
import '../fonts.scss';

const cx = classnames.bind(styles);

export default class App extends Component {
  render() {
    return (
      <div className={cx('app')}>
        <Game />
        <Log />
      </div>
    );
  }
}
