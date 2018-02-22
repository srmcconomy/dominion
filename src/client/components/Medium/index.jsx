import React from 'react';
import classnames from 'classnames/bind';

import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function Big(props) {
  return <div className={cx('medium')}>{props.children}</div>;
}
