import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Druid'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Druid']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Fate');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should set aside boons for druid', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.boonPile.length).toBe(9);
    expect(game.druidBoons.length).toBe(3);
  });

  test('should receive a set aside boon', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Druid']);
    await waitForNextInput();
    respondWithCard('Druid');
    await waitForNextInput();
    expect(player.buys).toBe(2);
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.boonsReceivedThisTurn.length).toBe(1);
    expect(game.druidBoons.includes(player.boonsReceivedThisTurn[0])).toBe(true);
  });
};
