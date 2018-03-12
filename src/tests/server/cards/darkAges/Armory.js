import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Armory'];
  });

  test('should gain to top of deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Armory']);
    await waitForNextInput();
    respondWithCard('Armory');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Silver');
    expect(player.discardPile.length).toBe(0);
  });

  test('Special interactions work: trader, GhostTown, see wiki');
};
