import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';

import styles from './styles.scss';

const cx = classnames.bind(styles);

function Log(props) {
  return (
    <div className={cx('log')}>
      {props.log.map(i => <div>{i}</div>)}
    </div>
  );
}

export default connect(
  state => ({ log: state.log }),
)(Log);
