import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn, respondWithSupply } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Transmogrify'];
  });

  test('should give 1 action', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Transmogrify']);
    await waitForNextInput();
    respondWithCard('Transmogrify');
    await waitForNextInput();

    expect(player.actions).toBe(1);
  });

  test('should move itself to the Tavern mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Transmogrify']);
    await waitForNextInput();
    respondWithCard('Transmogrify');
    await waitForNextInput();

    expect(player.playArea.length).toBe(0);
    expect(player.mats.tavern.last().title).toBe('Transmogrify');
  });

  test('should be able to be triggered at the start of the turn, remodeling a card into your hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Transmogrify']);
    await waitForNextInput();
    respondWithCard('Transmogrify');

    await skipToNextTurn(player);
    setHand(player, ['Duchy', 'Duchy', 'Duchy', 'Duchy', 'Duchy']);
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();

    expect(game.trash).toHaveSome(c => c.title === 'Duchy');
    expect(player.hand).toHaveSome(c => c.title === 'Gold');
    expect(player.playArea).toHaveSome(c => c.title === 'Transmogrify');
    expect(player.mats.tavern.length).toBe(0);
  });
};
