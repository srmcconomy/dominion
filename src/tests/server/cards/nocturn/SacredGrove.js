import TheFieldsGift from 'cards/nocturn/TheFieldsGift';
import TheMountainsGift from 'cards/nocturn/TheMountainsGift';
import TheRiversGift from 'cards/nocturn/TheRiversGift';
import TheWindsGift from 'cards/nocturn/TheWindsGift';
import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithFirstCard, respondWithCards, respondWithNoCards, respondWithChoice, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['SacredGrove'];
  });

  test('should give buy and money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SacredGrove']);
    await waitForNextInput();
    respondWithCard('SacredGrove');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.buys >= 2).toBe(true);
    expect(player.money >= 3).toBe(true);
  });

  test('should work with The Mountain\'s Gift', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheMountainsGift(game));
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SacredGrove']);
    await waitForNextInput();
    respondWithCard('SacredGrove');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.buys).toBe(2);
    expect(player.money).toBe(3);
    expect(player.discardPile.last().title).toBe('Silver');
    expect(otherPlayer.discardPile.last().title).toBe('Silver');
  });

  test('should work with The Field\'s Gift', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheFieldsGift(game));
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SacredGrove']);
    await waitForNextInput();
    respondWithCard('SacredGrove');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(4);
    expect(otherPlayer.buys).toBe(0);
    expect(otherPlayer.money).toBe(0);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(0);
    expect(player.boonPile.length).toBe(1);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('should work with The River\'s Gift')//, async () => {
    // const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    // game.boonPile.push(new TheRiversGift(game));
    // const otherPlayer = game.playerOrder.find(p => p !== player);
    // setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SacredGrove']);
    // await waitForNextInput();
    // respondWithCard('SacredGrove');
    // await waitForNextInput();
    // respondWithFirstCard();
    // await waitForNextInput();
    // expect(player.hand.length).toBe(5);
    // expect(player.actions).toBe(1);
    // expect(game.boonPile.length).toBe(12);
    // expect(game.boonDiscardPile.length).toBe(0);
    // expect(player.boonPile.length).toBe(1);

    // await skipToNextTurn(player);
    // await waitForNextInput();
    // expect(player.hand.length).toBe(7);
    // expect(game.boonPile.length).toBe(12);
    // expect(game.boonDiscardPile.length).toBe(1);
    // expect(player.boonPile.length).toBe(0);
  // });

  test('should work with The Wind\'s Gift', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheWindsGift(game));
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SacredGrove']);
    setDeck(player, ['Estate', 'Estate']);
    setDeck(otherPlayer, ['Duchy', 'Duchy']);
    await waitForNextInput();
    respondWithCard('SacredGrove');
    await waitForNextInput();
    respondWithCards(['Estate', 'Estate']);
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    respondWithCards(['Duchy', 'Duchy']);
    await waitForNextInput();
    expect(player.buys).toBe(2);
    expect(player.money).toBe(3);
    expect(player.hand.length).toBe(4);
    expect(player.discardPile.length).toBe(2);
    expect(otherPlayer.hand.length).toBe(5);
    expect(otherPlayer.discardPile.length).toBe(2);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });
};
