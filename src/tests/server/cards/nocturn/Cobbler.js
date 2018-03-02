import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Cobbler'];
  });

  test('should gain 4 cost cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold', 'Cobbler']);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Cobbler');
    await waitForNextInput();

    await skipToNextTurn(player);
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.hand.last().title).toBe('Silver');
    expect(game.supplies.get('Silver').cards.length).toBe(39);
  });
};
