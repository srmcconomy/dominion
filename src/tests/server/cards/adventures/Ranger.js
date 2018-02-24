import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn, respondWithSupply } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Ranger'];
  });

  test('should give 1 buy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ranger']);
    await waitForNextInput();
    respondWithCard('Ranger');
    await waitForNextInput();
    expect(player.buys).toBe(2);
  });

  test('should flip your journey token', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ranger']);
    await waitForNextInput();
    respondWithCard('Ranger');
    await waitForNextInput();

    expect(player.journeyToken).toBe('faceDown');
  });


  test('should not give cards if the token is face down', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Ranger']);
    await waitForNextInput();
    respondWithCard('Ranger');
    await waitForNextInput();

    expect(player.hand.length).toBe(4);
  });

  test('should give 5 cards if the token is face up', async () => {
    setStartingDeck([...Array(20)].map(() => 'Curse'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Village', 'Ranger', 'Ranger']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Ranger');
    await waitForNextInput();
    respondWithCard('Ranger');
    await waitForNextInput();

    expect(player.hand.length).toBe(8);
  });
};
