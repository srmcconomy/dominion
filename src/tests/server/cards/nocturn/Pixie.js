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
    game.getKingdomCards = () => ['Pixie'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Pixie']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Fate');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Goat should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Goat']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types).toHave('Heirloom');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should add Goat to starting deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    await waitForNextInput();
    expect(game.supplies.get('Copper').cards.length).toBe(48);
    expect(player.hand.filter(c => c.title === 'Goat').length + player.deck.filter(c => c.title === 'Goat').length).toBe(1);
    expect(player.hand.filter(c => c.title === 'Copper').length + player.deck.filter(c => c.title === 'Copper').length).toBe(6);
    expect(player.hand.filter(c => c.title === 'Estate').length + player.deck.filter(c => c.title === 'Estate').length).toBe(3);
  });

  test('should cantrip', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pixie']);
    await waitForNextInput();
    respondWithCard('Pixie');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(game.boonPile.length).toBe(11);
    expect(game.boonDiscardPile.length).toBe(1);
  });

  test('should work with The Mountain\'s Gift', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheMountainsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pixie']);
    await waitForNextInput();
    respondWithCard('Pixie');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.discardPile.filter(c=> c.title === 'Silver').length).toBe(2);
  });

  test('should work with The Field\'s Gift', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheFieldsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pixie']);
    await waitForNextInput();
    respondWithCard('Pixie');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(3);
    expect(player.money).toBe(2);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(0);
    expect(player.boonPile.length).toBe(1);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('should work with The River\'s Gift', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheRiversGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pixie']);
    await waitForNextInput();
    respondWithCard('Pixie');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(0);
    expect(player.boonPile.length).toBe(1);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('should work with The Wind\'s Gift', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.boonPile.push(new TheWindsGift(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pixie']);
    setDeck(player, ['Silver', 'Silver', 'Estate', 'Estate', 'Gold']);
    await waitForNextInput();
    respondWithCard('Pixie');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    respondWithCards(['Estate', 'Estate']);
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.discardPile.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(game.boonPile.length).toBe(12);
    expect(game.boonDiscardPile.length).toBe(1);
    expect(player.boonPile.length).toBe(0);
  });

  test('Goat should trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Goat']);
    await waitForNextInput();
    respondWithCard('Goat');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(1);
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Copper');
  });

  test('Goat should be able to not trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Goat']);
    await waitForNextInput();
    respondWithCard('Goat');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.money).toBe(1);
    expect(player.hand.length).toBe(4);
    expect(game.trash.length).toBe(0);
  });
};
