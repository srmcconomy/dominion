import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCardFromHand, setStartingDeck, respondWithChoice } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should draw to 7 cards from 5 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Library']);
    await waitForNextInput();
    respondWithCardFromHand('Library');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
  });

  test('should draw to 7 cards from 1 card', async () => {
    setStartingDeck([...Array(30)].map(() => 'Copper'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Library']);
    await waitForNextInput();
    respondWithCardFromHand('Library');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
  });

  test('should ask to set aside any actions', async () => {
    setStartingDeck([
      ...[...Array(7)].map(() => 'Copper'),
      'Chapel',
      'Chapel',
      ...[...Array(7)].map(() => 'Copper'),
    ]);
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Library']);
    await waitForNextInput();
    respondWithCardFromHand('Library');
    await waitForNextInput();

    respondWithChoice(0);
    let { lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(true);

    respondWithChoice(1);
    ({ lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(player.hand.length).toBe(7);
    expect(player.hand.filter(c => c.title === 'Chapel').length).toBe(1);
  });
};
