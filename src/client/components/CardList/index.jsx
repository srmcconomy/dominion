import React from 'react';
import classnames from 'classnames/bind';

import Card from 'components/Card';
import styles from './styles.scss';

const cx = classnames.bind(styles);

export default function CardList(props) {
  const { small, data, selectableCards, selectedCards } = props;
  let i = 0;
  return (
    <div className={cx('card-list', { small })} style={{ width: `${(small ? 12 : 18) * data.size}em`, maxWidth: '100%' }}>
      {data.map(card => (
        <Card
          key={card.id}
          data={card}
          selectable={selectableCards && selectableCards.has(card)}
          selected={selectedCards && selectedCards.has(card)}
          onClick={() => props.onCardClick && props.onCardClick(card)}
          style={{ marginLeft: `${100 * (i++ / data.size)}%` }}
          small={small}
        />
      ))}
    </div>
  );
}
