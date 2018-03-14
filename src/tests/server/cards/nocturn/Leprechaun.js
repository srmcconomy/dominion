import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Leprechaun'];
  });

  test('should hex');// , async () => {
  //   const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
  //   setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
  //   await waitForNextInput();
  //   respondWithCard('Market');
  //   await waitForNextInput();
  //   expect(player.hand.length).toBe(5);
  //   expect(player.actions).toBe(1);
  //   expect(player.buys).toBe(2);
  //   expect(player.money).toBe(1);
  // });

  test('should give wish when condition met', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Village', 'Village', 'Village', 'Village', 'Village', 'Village', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.discardPile.some(c => c.title === 'Gold')).toBe(true);
    expect(player.discardPile.last().title).toBe('Wish');
  });

  test('should add wish supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Wish').cards.length).toBe(12);
  });
};
