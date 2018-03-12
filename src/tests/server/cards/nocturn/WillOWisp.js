import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['WillOWisp'];
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
  });
};
