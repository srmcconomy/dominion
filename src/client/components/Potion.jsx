import React from 'react';
import classnames from 'classnames/bind';

import styles from './potion.scss';

const cx = classnames.bind(styles);

export default function Potion({ inline = true, children }) {
  return (
    <div className={cx('potion', { inline })}>
      <div>
        <span>{children}</span>
      </div>
    </div>
  );
}
