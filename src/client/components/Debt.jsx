import React from 'react';
import classnames from 'classnames/bind';

import styles from './debt.scss';

const cx = classnames.bind(styles);

export default function Debt({ inline = true, children }) {
  return (
    <div className={cx('debt', { inline })}>
      <div>
        <span>{children}</span>
      </div>
    </div>
  );
}
