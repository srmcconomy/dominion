import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Herbalist'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Herbalist']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should top deck treasures', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Potion', 'Herbalist']);
    await waitForNextInput();
    respondWithCard('Herbalist');
    await waitForNextInput();
    respondWithCard('Potion');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Herbalist');
    await waitForNextInput();
    respondWithCard('Potion');
    await waitForNextInput();
    expect(player.hand.some(c => c.title === 'Potion')).toBe(true);
    expect(player.deck.length).toBe(1);
  });
};
