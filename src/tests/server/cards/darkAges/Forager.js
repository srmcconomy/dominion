import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Forager'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Forager']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give $1 per treasure in trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Forager', 'Copper', 'Silver', 'Forager']);
    await waitForNextInput();
    respondWithCard('Forager');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(1);
    expect(game.trash.last().title).toBe('Copper');
    respondWithCard('Forager');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(1);
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(3);
    expect(player.money).toBe(3);
    expect(game.trash.last().title).toBe('Silver');
  });

  test('should work on split treasures', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Harem', 'Forager']);
    await waitForNextInput();
    respondWithCard('Forager');
    await waitForNextInput();
    respondWithCard('Harem');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(1);
    expect(game.trash.last().title).toBe('Harem');
  });
};
