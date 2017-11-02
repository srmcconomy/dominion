import React from 'react';
import classnames from 'classnames/bind';

import styles from './coin.scss';

const cx = classnames.bind(styles);

export default function Coin(props) {
  return (
    <div className={cx('coin', { small: props.small })}>
      <span>{props.children}</span>
    </div>
  );
}
