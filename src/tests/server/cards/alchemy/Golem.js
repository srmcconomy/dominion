import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithCard, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Golem'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Golem']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(1);
    expect(card.cost.debt).toBe(0);
  });

  test('should create Potion Supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Potion').cards.length).toBe(16);
  });

  test('should play first two actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Golem']);
    setDeck(player, ['Copper', 'Village', 'Golem', 'Chapel', 'Estate']);
    await waitForNextInput();
    respondWithCard('Golem');
    await waitForNextInput();
    expect(player.deck.length).toBe(1);
    expect(player.discardPile.length).toBe(2);
    respondWithCard('Village');
    await waitForNextInput();
    expect(player.deck.length).toBe(0);
    expect(player.actions).toBe(2);
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(player.actions).toBe(2);
    expect(game.trash.length).toBe(4);
  });

  test('should play actions from discardPile', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Golem']);
    setDeck(player, ['Estate', 'Estate', 'Estate', 'Estate', 'Estate']);
    setDiscardPile(player, ['Village', 'Village']);
    await waitForNextInput();
    respondWithCard('Golem');
    await waitForNextInput();
    expect(player.deck.length).toBe(0);
    expect(player.discardPile.length).toBe(5);
    respondWithCard('Village');
    await waitForNextInput();
    expect(player.deck.length).toBe(4);
    expect(player.discardPile.length).toBe(0);
    respondWithCard('Village');
    await waitForNextInput();
    expect(player.deck.length).toBe(3);
  });

  test('should be fine if not finding two actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Golem']);
    setDeck(player, ['Estate', 'Estate', 'Village', 'Estate', 'Estate']);
    setDiscardPile(player, ['Estate', 'Estate']);
    await waitForNextInput();
    respondWithCard('Golem');
    await waitForNextInput();
    expect(player.deck.length).toBe(0);
    expect(player.discardPile.length).toBe(6);
    respondWithCard('Village');
    await waitForNextInput();
    expect(player.deck.length).toBe(5);
    expect(player.discardPile.length).toBe(0);
    respondWithCard('Copper');
    await waitForNextInput();
  });
};
