import 'source-map-support/register';

import DirtyModel, { trackDirty, DirtyMap } from 'utils/DirtyModel';
import Pile from 'utils/Pile';
import Copper from 'cards/basic/Copper';

@DirtyModel
class B {
  @trackDirty
  x = 3;

  y = 4;
}


@DirtyModel
class A {
  @trackDirty
  a = 4;

  @trackDirty
  c = 'c'

  b = 5;

  @trackDirty
  d = new B();

  @trackDirty
  map = new DirtyMap();

  @trackDirty
  pile = new Pile();

  @trackDirty(pile => pile.size)
  deck = new Pile();

  @trackDirty(pile => (pile.size > 0 ? pile.last().id : null))
  hand = new Pile();
}

const a = new A();
console.log('should be a : 4, c : c, d : { x }, map : {}');
console.log(a.createDirty());
a.clean();
console.log('should be nothing');
console.log(a.createDirty());
a.a = 2;
console.log('should be a : 2');
console.log(a.createDirty());
a.map.set('1', 12);
console.log('should be a : 2, map : { 1 }');
console.log(a.createDirty());
a.map.set('2', 13);
console.log('should be a : 2, map : { 1 2 }');
console.log(a.createDirty());
a.clean();
console.log('should be nothing');
console.log(a.createDirty());
a.map.set('3', 14);
console.log('should be map : { 3 }');
console.log(a.createDirty());
a.d.x = 7;
console.log('should be d : { x }, map : { 3 }');
console.log(a.createDirty());
a.clean();
console.log('should be nothing');
console.log(a.createDirty());
a.map.set('6', new B());
console.log('should be map : { 6 : { x } }');
console.log(a.createDirty());
a.clean();
console.log('should be nothing');
console.log(a.createDirty());
a.map.get('6').x = 11;
console.log('should be map : { 6 : { x } }');
console.log(a.createDirty());
a.clean();
console.log('should be nothing');
console.log(a.createDirty());
a.pile.push(new Copper());
a.deck.push(new Copper());
a.hand.push(new Copper());
console.log('should be map : { 6 : { x } }');
console.log(a.createDirty());
