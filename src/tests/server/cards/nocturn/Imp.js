import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Imp'];
  });

  test('should have 13 in supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Imp').cards.length).toBe(13);
  });

  test('should allow playing of a new card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Smithy', 'Imp']);
    await waitForNextInput();
    respondWithCard('Imp');
    await waitForNextInput();
    respondWithCard('Smithy');
    await waitForNextInput();
    expect(player.hand.length).toBe(8);
    expect(player.actions).toBe(0);
  });

  test('should not allow playing of an old card');//, async () => {
  //   const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
  //   setHand(player, ['Copper', 'Copper', 'Market', 'Market', 'Imp']);
  //   await waitForNextInput();
  //   respondWithCard('Market');
  //   await waitForNextInput();
  //   respondWithCard('Imp');
  //   await waitForNextInput();
  //   respondWithCard('Market');
  //   const { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
  //   expect(lastInputWasValid).toBe(false);
  //   expect(player.hand.length).toBe(6);
  //   expect(player.actions).toBe(0);
  // });
};
