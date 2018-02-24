import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['HornOfPlenty'];
  });

  test('should give 1 of everything', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Copper', 'HornOfPlenty']);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('HornOfPlenty');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.buys).toBe(1);
    expect(player.money).toBe(3);
    expect(player.discardPile.length).toBe(1);
    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.discardPile.length).toBe(7);
  });

  test('should trash on victory gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Platinum', 'HornOfPlenty']);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithCard('Platinum');
    await waitForNextInput();
    respondWithCard('HornOfPlenty');
    await waitForNextInput();
    respondWithSupply('Duchy');
    await waitForNextInput();
    expect(player.buys).toBe(1);
    expect(player.money).toBe(11);
    expect(player.discardPile.length).toBe(1);
    expect(game.trash.last().title).toBe('HornOfPlenty');
    respondWithSupply('Province');
    await waitForNextInput();
    expect(player.discardPile.length).toBe(6);
  });
};
