import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['MarketSquare'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['MarketSquare']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Reaction');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give base stuff', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'MarketSquare']);
    await waitForNextInput();
    respondWithCard('MarketSquare');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(2);
  });

  test('should be able to discard for Gold', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'MarketSquare']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('MarketSquare');
    await waitForNextInput();
    expect(player.hand.length).toBe(0);
    expect(player.discardPile.length).toBe(2);
    expect(player.discardPile.last().title).toBe('Gold');
  });

  test('Same MarketSquare should be able to proc twice if drawn again');
  // trash cultist, proc market square for gold, proc Cultist's draw 3 and draw same market square, proc marketsquare again
};
