import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Ruins'];
  });

  test('Ruins pile should be generated properly', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Ruins').cards.filter(c => (c.types.has('Action') && c.types.has('Ruins'))).length).toBe(10);
  });

  test('AbandonedMine should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'AbandonedMine']);
    await waitForNextInput();
    respondWithCard('AbandonedMine');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(1);
  });

  test('RuinedLibrary should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'RuinedLibrary']);
    await waitForNextInput();
    respondWithCard('RuinedLibrary');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(0);
  });

  test('RuinedMarket should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'RuinedMarket']);
    await waitForNextInput();
    respondWithCard('RuinedMarket');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(0);
  });

  test('RuinedVillage should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'RuinedVillage']);
    await waitForNextInput();
    respondWithCard('RuinedVillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(0);
  });

  test('Survivors should discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Survivors']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Silver', 'Gold']);
    await waitForNextInput();
    respondWithCard('Survivors');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.deck.length).toBe(3);
    expect(player.discardPile.length).toBe(2);
    expect(player.deck.last().title).toBe('Copper');
  });

  test('Survivors should discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Survivors']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Silver', 'Gold']);
    await waitForNextInput();
    respondWithCard('Survivors');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.deck.length).toBe(5);
    expect(player.discardPile.length).toBe(0);
    expect(player.deck.last().title).toBe('Silver');
  });
};
