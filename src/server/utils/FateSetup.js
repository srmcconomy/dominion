import TheEarthsGift from 'cards/nocturn/TheEarthsGift';
import TheFieldsGift from 'cards/nocturn/TheFieldsGift';
import TheFlamesGift from 'cards/nocturn/TheFlamesGift';
import TheForestsGift from 'cards/nocturn/TheForestsGift';
import TheMoonsGift from 'cards/nocturn/TheMoonsGift';
import TheMountainsGift from 'cards/nocturn/TheMountainsGift';
import TheRiversGift from 'cards/nocturn/TheRiversGift';
import TheSeasGift from 'cards/nocturn/TheSeasGift';
import TheSkysGift from 'cards/nocturn/TheSkysGift';
import TheSunsGift from 'cards/nocturn/TheSunsGift';
import TheSwampsGift from 'cards/nocturn/TheSwampsGift';
import TheWindsGift from 'cards/nocturn/TheWindsGift';
import Pile from 'utils/Pile';

export default async function fateSetup(game) {
  game.boonPile = new Pile();
  game.boonDiscardPile = new Pile();
  game.boonPile.push(new TheEarthsGift(game));
  game.boonPile.push(new TheFieldsGift(game));
  game.boonPile.push(new TheFlamesGift(game));
  game.boonPile.push(new TheForestsGift(game));
  game.boonPile.push(new TheMoonsGift(game));
  game.boonPile.push(new TheMountainsGift(game));
  game.boonPile.push(new TheRiversGift(game));
  game.boonPile.push(new TheSeasGift(game));
  game.boonPile.push(new TheSkysGift(game));
  game.boonPile.push(new TheSunsGift(game));
  game.boonPile.push(new TheSwampsGift(game));
  game.boonPile.push(new TheWindsGift(game));
  game.boonPile.shuffle();
}
