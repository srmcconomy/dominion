import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
  });

  test('should play and action card twice', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Moneylender', 'ThroneRoom']);
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('Moneylender');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(1);
    expect(player.actions).toBe(0);
    expect(player.money).toBe(6);
    expect(game.trash.length).toBe(2);
  });

  test('should add card to cardsPlayedThisTurn twice', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Merchant', 'ThroneRoom']);
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('Merchant');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.money).toBe(4);
    expect(player.cardsPlayedThisTurn.length).toBe(4);
  });

  test('should work on Durrations', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'MerchantShip', 'ThroneRoom']);
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('MerchantShip');
    // await waitForNextInput();
    // expect(player.hand.length).toBe(3);
    // expect(player.money).toBe(4);
    // expect(player.cardsPlayedThisTurn.length).toBe(3);
    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.money).toBe(4);
  });

  test('should work on cards that trash themselves');//, async () => {
  //   const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
  //   setHand(player, ['Copper', 'Copper', 'Silver', 'MerchantShip', 'ThroneRoom']);
  //   await waitForNextInput();
  //   respondWithCard('ThroneRoom');
  //   await waitForNextInput();
  //   respondWithCard('MerchantShip');
  //   // await waitForNextInput();
  //   // expect(player.hand.length).toBe(3);
  //   // expect(player.money).toBe(4);
  //   // expect(player.cardsPlayedThisTurn.length).toBe(3);
  //   await skipToNextTurn(player);
  //   await waitForNextInput();
  //   expect(player.money).toBe(4);
  // });

  test('should work on reserve cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Ratcatcher', 'ThroneRoom']);
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('Ratcatcher');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
    expect(player.mats.tavern.length).toBe(1);
  });
};
