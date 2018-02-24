import React from 'react';
import classnames from 'classnames/bind';

import styles from './coin.scss';

const cx = classnames.bind(styles);

export default function Coin({ inline = true, children }) {
  return (
    <div className={cx('coin', { inline })}>
      <div>
        <span>{children}</span>
      </div>
    </div>
  );
}
