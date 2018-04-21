import TheEarthsGift from 'cards/nocturn/TheEarthsGift';
import TheFieldsGift from 'cards/nocturn/TheFieldsGift';
import TheFlamesGift from 'cards/nocturn/TheFlamesGift';
import TheForestsGift from 'cards/nocturn/TheForestsGift';
import TheMoonsGift from 'cards/nocturn/TheMoonsGift';
import TheMountainsGift from 'cards/nocturn/TheMountainsGift';
import TheRiversGift from 'cards/nocturn/TheRiversGift';
import TheSeasGift from 'cards/nocturn/TheSeasGift';
import TheSkysGift from 'cards/nocturn/TheSkysGift';
import TheSunsGift from 'cards/nocturn/TheSunsGift';
import TheSwampsGift from 'cards/nocturn/TheSwampsGift';
import TheWindsGift from 'cards/nocturn/TheWindsGift';
import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithChoice, respondWithCard, respondWithCards, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Bard'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Bard']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Fate');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Boon Pile is created and WillOWisp', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('WillOWisp').cards.length).toBe(12);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonPile.some(c => c.title === 'TheEarthsGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheFieldsGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheFlamesGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheForestsGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheMoonsGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheMountainsGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheRiversGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheSeasGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheSkysGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheSunsGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheSwampsGift')).toBe(true);
    expect(game.boonPile.some(c => c.title === 'TheWindsGift')).toBe(true);
  });

  test('Earth\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheEarthsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('Bard');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(player.hand.length).toBe(3);
    expect(player.discardPile.some(c => c.title === 'Copper')).toBe(true);
    expect(player.discardPile.last().title).toBe('Bard');
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Field\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheFieldsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    expect(player.money).toBe(3);
    expect(player.actions).toBe(1);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(0);
    expect(player.boonPile.length).toBe(1);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Flame\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheFlamesGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Copper');
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Forest\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheForestsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    expect(player.money).toBe(3);
    expect(player.buys).toBe(2);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(0);
    expect(player.boonPile.length).toBe(1);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Moon\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheMoonsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    setDiscardPile(player, ['Copper', 'Copper', 'Gold', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(player.hand.length).toBe(4);
    expect(player.discardPile.length).toBe(4);
    expect(player.deck.last().title).toBe('Gold');
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Mountain\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheMountainsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(player.hand.length).toBe(4);
    expect(player.discardPile.last().title).toBe('Silver');
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('River\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheRiversGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(0);
    expect(player.boonPile.length).toBe(1);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Sea\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheSeasGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(player.hand.length).toBe(5);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Sky\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheSkysGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(player.hand.length).toBe(1);
    expect(player.discardPile.length).toBe(4);
    expect(player.discardPile.last().title).toBe('Gold');
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Sun\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheSunsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    setDeck(player, ['Estate', 'Duchy', 'Silver', 'Gold']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    respondWithCards(['Estate', 'Duchy']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Silver');
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Gold');
    expect(player.deck.length).toBe(2);
    expect(player.money).toBe(2);
    expect(player.discardPile.length).toBe(2);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Swamp\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheSwampsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(player.hand.length).toBe(4);
    expect(player.discardPile.last().title).toBe('WillOWisp');
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Wind\'s gift should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheWindsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Bard']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Estate']);
    await waitForNextInput();
    respondWithCard('Bard');
    await waitForNextInput();
    respondWithCards(['Estate', 'Estate']);
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(player.hand.length).toBe(4);
    expect(player.discardPile.length).toBe(2);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Make sure reshuffle is proced correctly and stuff');
};
