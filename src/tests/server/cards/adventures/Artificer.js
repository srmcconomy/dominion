import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn, respondWithSupply } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Artificer'];
  });

  test('should give 1 card, 1 action, and 1 coin', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Artificer']);
    await waitForNextInput();
    respondWithCard('Artificer');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.money).toBe(1);
    expect(player.actions).toBe(1);
  });

  test('should allow you to discard 0 cards to gain a card costing 0', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Artificer']);
    await waitForNextInput();
    respondWithCard('Artificer');
    await waitForNextInput();
    respondWithCards([]);
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();

    expect(player.discardPile).toHaveSome(c => c.title === 'Curse');
  });

  test('should allow you to discard 3 cards to gain a card costing 3', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Artificer']);
    await waitForNextInput();
    respondWithCard('Artificer');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();

    expect(player.discardPile).toHaveSome(c => c.title === 'Silver');
  });

  test('should not allow you to discard 3 cards to gain a card costing 2', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Artificer']);
    await waitForNextInput();
    respondWithCard('Artificer');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithSupply('Estate');
    const { lastInputWasValid } = await waitForNextInput();

    expect(lastInputWasValid).toBe(false);
  });
};
