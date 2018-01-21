import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Miser'];
  });

  test('should give the option to put one Copper on the Tavern mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Miser']);
    await waitForNextInput();
    respondWithCard('Miser');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();

    expect(player.hand.length).toBe(3);
    expect(player.mats.tavern.last().title).toBe('Copper');
  });

  test('should do nothing if the first option is selected with no Coppers in hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Miser']);
    await waitForNextInput();
    respondWithCard('Miser');
    await waitForNextInput();
    respondWithChoice(0);
    const { input } = await waitForNextInput();

    expect(input.selectCards).toBe(undefined);
    expect(player.mats.tavern.length).toBe(0);
  });

  test('should give the option of giving 1 coin per Copper on the Tavern mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Village', 'Village', 'Miser', 'Miser', 'Miser', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Miser');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Miser');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Miser');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();

    expect(player.money).toBe(2);
  });
};
