import Card from 'cards/Card';
import * as Cards from './';

Object.keys(Cards).forEach(title => Card.classes.set(title, Cards[title]));
