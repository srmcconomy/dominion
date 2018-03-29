import BadOmens from 'cards/nocturn/BadOmens';
import Delusion from 'cards/nocturn/Delusion';
import Envy from 'cards/nocturn/Envy';
import Famine from 'cards/nocturn/Famine';
import Fear from 'cards/nocturn/Fear';
import Greed from 'cards/nocturn/Greed';
import Haunting from 'cards/nocturn/Haunting';
import Locusts from 'cards/nocturn/Locusts';
import Misery from 'cards/nocturn/Misery';
import Plague from 'cards/nocturn/Plague';
import Poverty from 'cards/nocturn/Poverty';
import War from 'cards/nocturn/War';
import Pile from 'utils/Pile';

export default async function fateSetup(game) {
  game.hexPile = new Pile();
  game.hexDiscardPile = new Pile();
  game.hexPile.push(new BadOmens(game));
  game.hexPile.push(new Delusion(game));
  game.hexPile.push(new Envy(game));
  game.hexPile.push(new Famine(game));
  game.hexPile.push(new Fear(game));
  game.hexPile.push(new Greed(game));
  game.hexPile.push(new Haunting(game));
  game.hexPile.push(new Locusts(game));
  game.hexPile.push(new Misery(game));
  game.hexPile.push(new Plague(game));
  game.hexPile.push(new Poverty(game));
  game.hexPile.push(new War(game));
  game.hexPile.shuffle();
}
