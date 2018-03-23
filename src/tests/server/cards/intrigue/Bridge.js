import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn, respondWithSupply } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Bridge'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Bridge']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give 1 buy and 1 coin', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bridge']);
    await waitForNextInput();
    respondWithCard('Bridge');
    await waitForNextInput();
    expect(player.buys).toBe(2);
    expect(player.money).toBe(1);
  });

  test('should make cards cost 1 coin less', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bridge']);
    await waitForNextInput();
    respondWithCard('Bridge');
    await waitForNextInput();
    player.money = 2;
    respondWithCards([]);
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();

    expect(player.discardPile).toHaveSome(c => c.title === 'Silver');
  });
};
