import React, { Component } from 'react';
import classnames from 'classnames/bind';

import Supply from 'components/Supply';

import styles from './supplies.scss';

const cx = classnames.bind(styles);

export default class Supplies extends Component {
  render() {
    const { treasure, victory, kingdom, nonsupply } = this.props.data;
    return (
      <div className={cx('supplies')}>
        <div className={cx('victory')}>
          {victory.map(title => <Supply title={title} small />)}
        </div>
        <div className={cx('kingdom')}>
          {kingdom.map(title => <Supply title={title} />)}
        </div>
        <div className={cx('victory')}>
          {treasure.map(title => <Supply title={title} small />)}
        </div>
      </div>
    );
  }
}
