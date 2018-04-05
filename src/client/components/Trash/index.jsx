import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import CardList from 'components/CardList';

import styles from './styles.scss';

const cx = classnames.bind(styles);


function Trash({ trash }) {
  return (
    <div className={cx('trash')}>
      <CardList
        data={trash}
      />
    </div>
  );
}

export default connect(
  state => ({
    trash: state.game.trash,
  }),
)(Trash);
