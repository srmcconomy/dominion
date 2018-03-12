import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['ThroneRoom', 'Ratcatcher', 'Pillage'];
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
    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.money).toBe(4);
  });

  test('should be able to TR, TR, Caravan, Dungeon', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Dungeon', 'Caravan', 'ThroneRoom', 'ThroneRoom']);
    setDeck(player, Array(50).fill('Copper'));
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(0);
    respondWithCard('Dungeon');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(player.actions).toBe(2);
    respondWithCard('Caravan');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(4);
    await skipToNextTurn(player);
    setDeck(player, ['Gold', 'Estate', 'Silver', 'Estate', 'Estate', 'Estate']);
    await waitForNextInput();
    respondWithCard('Caravan');
    await waitForNextInput();
    respondWithCards(['Estate', 'Estate']); // Dungeon should automatically proc twice now that it is only mandetory trigger
    await waitForNextInput();
    respondWithCards(['Estate', 'Estate']);
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
    expect(player.hand.some(c => c.title === 'Silver')).toBe(true);
    expect(player.hand.some(c => c.title === 'Gold')).toBe(true);
    expect(player.actions).toBe(1);
  });

  test('should work on cards that trash themselves', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Pillage', 'ThroneRoom']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('Pillage');
    await waitForNextInput();
    expect(game.trash.length).toBe(1);
    expect(player.discardPile.length).toBe(4);
    expect(player.playArea.length).toBe(1);
  });

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

  test('Next Reshuffle funky things don\'t happen if this.cards is stale');
};
