import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Lookout'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Lookout']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should move cards correctly', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Lookout']);
    setDeck(player, ['Copper', 'Copper', 'Province', 'Duchy', 'Estate']);
    await waitForNextInput();
    respondWithCard('Lookout');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithCard('Province');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Estate');
    expect(player.discardPile.last().title).toBe('Duchy');
    expect(player.deck.last().title).toBe('Province');
    expect(player.actions).toBe(1);
  });

  test('should work with not enough cards in deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Lookout']);
    setDeck(player, ['Duchy', 'Estate']);
    await waitForNextInput();
    respondWithCard('Lookout');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Estate');
    expect(player.discardPile.last().title).toBe('Duchy');
    expect(player.deck.length).toBe(0);
    expect(player.actions).toBe(1);
  });
};
