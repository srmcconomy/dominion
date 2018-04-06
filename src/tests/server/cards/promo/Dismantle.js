import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Dismantle'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Dismantle']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should trash coppers', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Dismantle']);
    await waitForNextInput();
    respondWithCard('Dismantle');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Copper');
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(1);
  });

  test('should trash Estates and gain Coppers', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Dismantle']);
    await waitForNextInput();
    respondWithCard('Dismantle');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithSupply('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Estate');
    expect(player.discardPile.some(c => c.title === 'Copper')).toBe(true);
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(1);
  });

  test('should trash Duchies and gain Silvers', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Duchy', 'Dismantle']);
    await waitForNextInput();
    respondWithCard('Dismantle');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Duchy');
    expect(player.discardPile.some(c => c.title === 'Silver')).toBe(true);
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(1);
  });

  test('Can\'t gain cards that cost more');

  test('works with potion/debt cards');
};
