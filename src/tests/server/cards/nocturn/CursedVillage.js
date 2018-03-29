import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['CursedVillage'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['CursedVillage']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Doom');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give actions and draw to 6', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'CursedVillage']);
    await waitForNextInput();
    respondWithCard('CursedVillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(2);
  });

  test('should hex when bought', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Platinum']);
    await waitForNextInput();
    respondWithCard('Platinum');
    await waitForNextInput();
    respondWithSupply('CursedVillage');
    await waitForNextInput();
    expect(player.hexsReceivedThisTurn.length).toBe(1);
  });

  test('should hex when gained', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Altar']);
    await waitForNextInput();
    respondWithCard('Altar');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('CursedVillage');
    await waitForNextInput();
    expect(player.hexsReceivedThisTurn.length).toBe(1);
  });
};
