import { List } from 'immutable';

import Card from 'cards/Card';
import Model from 'models/Model';

export const cardTransform = id => Model.fromID(id);
export const cardListTransform = arr => new List(arr.map(id => Model.fromID(id)));
export const newCardListTransform = arr => new List(arr.map(({ id, title }) => (Model.idExists(id) ? Model.fromID(id) : Card.from(id, title))));
export const pileTransform = ({ pile }) => new List(pile.map(id => Model.fromID(id)));

