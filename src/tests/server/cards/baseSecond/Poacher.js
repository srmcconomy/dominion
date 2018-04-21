import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Poacher'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Poacher']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give 1 coin', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Poacher']);
    await waitForNextInput();
    respondWithCard('Poacher');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
  });

  test('should discard cards for each empty supply', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.supplies.get('Estate').cards.clear();
    game.supplies.get('Duchy').cards.clear();
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Poacher']);
    await waitForNextInput();
    respondWithCard('Poacher');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
  });
};
