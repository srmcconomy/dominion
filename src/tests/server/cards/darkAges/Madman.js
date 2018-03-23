import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Hermit'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Madman']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(0);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should draw for each card in hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Madman']);
    await waitForNextInput();
    respondWithCard('Madman');
    await waitForNextInput();
    expect(player.hand.length).toBe(8);
    expect(player.playArea.length).toBe(0);
    expect(player.actions).toBe(2);
    expect(game.supplies.get('Madman').cards.length).toBe(11);
  });

  test('should work on empty hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Madman']);
    await waitForNextInput();
    respondWithCard('Madman');
    await waitForNextInput();
    expect(player.hand.length).toBe(0);
    expect(player.playArea.length).toBe(0);
    expect(player.actions).toBe(2);
    expect(game.supplies.get('Madman').cards.length).toBe(11);
  });
};
