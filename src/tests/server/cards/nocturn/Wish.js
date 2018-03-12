import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Wish'];
  });

  test('should have 12 in supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Wish').cards.length).toBe(12);
  });

  test('should allow gaining of $6 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Wish']);
    await waitForNextInput();
    respondWithCard('Wish');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.hand.last().title).toBe('Gold');
    expect(player.playArea.length).toBe(0);
    expect(player.actions).toBe(1);
    expect(game.supplies.get('Wish').cards.length).toBe(13);
  });

  test('shouldn\'t gain second if throned', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'ThroneRoom', 'Wish']);
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('Wish');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.hand.last().title).toBe('Gold');
    expect(player.playArea.length).toBe(1);
    expect(player.actions).toBe(2);
    expect(game.supplies.get('Wish').cards.length).toBe(13);

    respondWithCard('Copper');
    await waitForNextInput();
  });
};
