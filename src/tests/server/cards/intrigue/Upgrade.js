import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Upgrade'];
  });

  test('should gain a card costing one more', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Upgrade']);
    await waitForNextInput();
    respondWithCard('Upgrade');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(player.discardPile.last().title).toBe('Silver');
  });

  test('should be fine if no cards to gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Upgrade']);
    await waitForNextInput();
    respondWithCard('Upgrade');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
    expect(player.discardPile.length).toBe(0);
  });

  test('Should gain a card costing one more even if there is a potion in the cost');
};
