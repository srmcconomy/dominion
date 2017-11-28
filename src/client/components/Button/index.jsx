import React from 'react';
import classnames from 'classnames/bind';

import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function Button(props) {
  return (
    <button className={cx('button')} onClick={props.onClick}>
      <span className={cx('text')}>
        {props.children}
      </span>
    </button>
  );
}
