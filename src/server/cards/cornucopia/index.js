import Card from 'cards/Card';
import * as Cards from './';

Object.keys(Cards).forEach(title => Card.classes.set(Cards[title].title, Cards[title]));
