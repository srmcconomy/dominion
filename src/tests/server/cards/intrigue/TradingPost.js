import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['TradingPost'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['TradingPost']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should trash for silver', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'TradingPost']);
    await waitForNextInput();
    respondWithCard('TradingPost');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.hand.some(c => c.title === 'Silver')).toBe(true);
  });

  test('should not gain if didn\'t trash enough', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper','TradingPost']);
    await waitForNextInput();
    respondWithCard('TradingPost');
    await waitForNextInput();
    respondWithCards(['Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(0);
    expect(player.hand.some(c => c.title === 'Silver')).toBe(false);
  });
};
