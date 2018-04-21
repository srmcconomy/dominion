import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Advisor'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Advisor']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should draw and opponent discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Advisor']);
    setDeck(player, ['Copper', 'Copper', 'Estate', 'Gold', 'Silver']);
    await waitForNextInput();
    respondWithCard('Advisor');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    expect(player.discardPile.last().title).toBe('Gold');
    expect(player.hand.some(c => c.title === 'Silver')).toBe(true);
    expect(player.hand.some(c => c.title === 'Estate')).toBe(true);
  });
};
