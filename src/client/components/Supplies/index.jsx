import React from 'react';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';

import Supply from 'components/Supply';

import styles from './styles.scss';

const cx = classnames.bind(styles);

function Supplies({ supplies: { treasure, treasure2, victory, kingdom, nonSupply } }) {
  return (
    <div className={cx('supplies')}>
      <div className={cx('victory')}>
        {victory.map(title => <Supply key={title} title={title} small />)}
      </div>
      <div className={cx('kingdom')}>
        {kingdom.map(title => <Supply key={title} title={title} />)}
      </div>
      <div className={cx('treasures')}>>
        <div className={cx('treasure')}> {treasure.map(title => <Supply key={title} title={title} small />)} </div>
        <div className={cx('treasure')}> {treasure2.map(title => <Supply key={title} title={title} small />)} </div>
      </div>
      <div className={cx('non-supply')}>
        {nonSupply.map(title => <Supply key={title} title={title} small />)}
      </div>
    </div>
  );
}

export default connect(
  state => ({
    supplies: state.game.organizedSupplies,
  })
)(Supplies);
