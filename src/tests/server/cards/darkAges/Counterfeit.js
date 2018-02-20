import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Counterfeit', 'Spoils'];
  });

  test('should double and trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Copper', 'Counterfeit']);
    await waitForNextInput();
    respondWithCard('Counterfeit');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.playArea.length).toBe(1);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(5);
    expect(game.trash.last().title).toBe('Silver');
  });

  test('should be optional', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Copper', 'Counterfeit']);
    await waitForNextInput();
    respondWithCard('Counterfeit');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.playArea.length).toBe(2);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(3);
    expect(game.trash.length).toBe(0);
  });

  test('should work with Spoils', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Spoils', 'Copper', 'Counterfeit']);
    await waitForNextInput();
    respondWithCard('Counterfeit');
    await waitForNextInput();
    respondWithCard('Spoils');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.playArea.length).toBe(1);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(7);
    expect(game.trash.length).toBe(0);
    expect(game.supplies.get('Spoils').cards.length).toBe(16);
  });

  test('should work with Venture');

  test('should work with Philosipher\'s Stone');

  test('should work with Bank');

  test('should work with Crown');

  test('should work with Loan');

  test('should work with Quarry');

  test('should work with Talisman');

  test('should work with Fool\'s Gold');
};
