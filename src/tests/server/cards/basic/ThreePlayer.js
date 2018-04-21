import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame(3);
    game.getKingdomCards = () => ['Potion', 'Ruins', 'Platinum', 'Colony'];
  });

  test('Have proper numbers in supplies', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Copper').cards.length).toBe(39);
    expect(game.supplies.get('Silver').cards.length).toBe(40);
    expect(game.supplies.get('Gold').cards.length).toBe(30);
    expect(game.supplies.get('Platinum').cards.length).toBe(12);

    expect(game.supplies.get('Potion').cards.length).toBe(16);

    expect(game.supplies.get('Estate').cards.length).toBe(12);
    expect(game.supplies.get('Duchy').cards.length).toBe(12);
    expect(game.supplies.get('Province').cards.length).toBe(12);
    expect(game.supplies.get('Colony').cards.length).toBe(12);

    expect(game.supplies.get('Curse').cards.length).toBe(20);

    expect(game.supplies.get('Ruins').cards.length).toBe(20);
  });
};
