import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Pawn'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Pawn']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should act as a cantrip', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pawn']);
    await waitForNextInput();
    respondWithCard('Pawn');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(0);
  });

  test('should give money and buy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pawn']);
    await waitForNextInput();
    respondWithCard('Pawn');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(1);
  });
};
