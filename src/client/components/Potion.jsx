import React from 'react';
import classnames from 'classnames/bind';

import styles from './potion.scss';

const cx = classnames.bind(styles);

export default function PotionImg({ inline = true }) {
  return (
    <div className={cx('potion', { inline })} />
  );
}
