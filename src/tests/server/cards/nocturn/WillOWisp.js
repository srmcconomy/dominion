import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['WillOWisp'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['WillOWisp']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Spirit');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(0);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should have 12 in supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('WillOWisp').cards.length).toBe(12);
  });

  test('should Lab for Cheap cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'WillOWisp']);
    setDeck(player, ['Estate', 'Gold']);
    await waitForNextInput();
    respondWithCard('WillOWisp');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.hand.last().title).toBe('Estate');
    expect(player.deck.length).toBe(0);
    expect(player.actions).toBe(1);
  });

  test('should not draw more expensive cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'WillOWisp']);
    setDeck(player, ['Gold', 'Estate']);
    await waitForNextInput();
    respondWithCard('WillOWisp');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.deck.last().title).toBe('Gold');
    expect(player.deck.length).toBe(1);
    expect(player.actions).toBe(1);
  });

  test('should not fail with empty deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'WillOWisp']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('WillOWisp');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.deck.length).toBe(0);
    expect(player.actions).toBe(1);
  });
};
