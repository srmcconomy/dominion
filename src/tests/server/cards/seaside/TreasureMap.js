import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['TreasureMap'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['TreasureMap']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should trash and gain gold with second map', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'TreasureMap', 'TreasureMap']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('TreasureMap');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.deck.filter(c => c.title === 'Gold').length).toBe(4);
  });

  test('should work with three in hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'TreasureMap', 'TreasureMap', 'TreasureMap']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('TreasureMap');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.deck.filter(c => c.title === 'Gold').length).toBe(4);
  });

  test('should trash but fail if only map', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'TreasureMap']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('TreasureMap');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.deck.filter(c => c.title === 'Gold').length).toBe(0);
  });

  test('Correct interaction with Band of Misfits and Overlord');
};
