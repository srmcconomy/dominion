import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['CoinOfTheRealm', 'Smithy'];
  });

  test('should give 1 coin', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'CoinOfTheRealm']);
    await waitForNextInput();
    respondWithCard('CoinOfTheRealm');
    await waitForNextInput();
    expect(player.money).toBe(1);
  });

  test('should move itself to the Tavern mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'CoinOfTheRealm']);
    await waitForNextInput();
    respondWithCard('CoinOfTheRealm');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.playArea.length).toBe(0);
    expect(player.mats.tavern.length).toBe(1);
  });

  test('should trigger when an Action is played, giving 2 actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'CoinOfTheRealm']);
    await waitForNextInput();
    respondWithCard('CoinOfTheRealm');
    await skipToNextTurn(player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Smithy']);
    await waitForNextInput();
    respondWithCard('Smithy');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();

    expect(player.playArea).toHaveSome(c => c.title === 'CoinOfTheRealm');
    expect(player.mats.tavern.length).toBe(0);
    expect(player.actions).toBe(2);
  });
};
