import React from 'react';
import classNames from 'classnames/bind';

import styles from './styles.scss';

const cx = classNames.bind(styles);

export default function Line() {
  return <div className={cx('line')} />;
}
