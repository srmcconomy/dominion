import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Sentry'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Sentry']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Sentry']);
    setDeck(player, ['Copper', 'Copper', 'Duchy', 'Duchy', 'Copper']);
    await waitForNextInput();
    respondWithCard('Sentry');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.deck.length).toBe(2);
    expect(player.discardPile.length).toBe(0);
    expect(game.trash.length).toBe(2);
  });

  test('should discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Sentry']);
    setDeck(player, ['Copper', 'Copper', 'Duchy', 'Duchy', 'Copper']);
    await waitForNextInput();
    respondWithCard('Sentry');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.deck.length).toBe(2);
    expect(player.discardPile.length).toBe(2);
    expect(game.trash.length).toBe(0);
  });

  test('should putback', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Sentry']);
    setDeck(player, ['Copper', 'Copper', 'Province', 'Duchy', 'Copper']);
    await waitForNextInput();
    respondWithCard('Sentry');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    respondWithCard('Province');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.deck.length).toBe(4);
    expect(player.deck.last().title).toBe('Province');
    expect(player.discardPile.length).toBe(0);
    expect(game.trash.length).toBe(0);
  });
};
