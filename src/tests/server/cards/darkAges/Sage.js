import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Sage'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Sage']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should draw cards $3+ discarding others', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Sage']);
    setDeck(player, ['Silver', 'Estate']);
    await waitForNextInput();
    respondWithCard('Sage');
    await waitForNextInput();
    expect(player.hand.last().title).toBe('Silver');
    expect(player.discardPile.last().title).toBe('Estate');
    expect(player.actions).toBe(1);
  });

  test('should be fine if nothing costs more than 3', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Sage']);
    setDeck(player, ['Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Sage');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.discardPile.length).toBe(2);
    expect(player.actions).toBe(1);
  });

  test('should skip over P cost cards');

  test('should draw 3P cost cards');
};
