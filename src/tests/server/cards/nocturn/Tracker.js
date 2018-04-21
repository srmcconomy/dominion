import Tracker from 'cards/nocturn/Tracker';
import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Tracker'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Tracker']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Fate');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Pouch should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Pouch']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types).toHave('Heirloom');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should add Pouch to starting deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    await waitForNextInput();
    expect(game.supplies.get('Copper').cards.length).toBe(48);
    expect(player.hand.filter(c => c.title === 'Pouch').length + player.deck.filter(c => c.title === 'Pouch').length).toBe(1);
    expect(player.hand.filter(c => c.title === 'Copper').length + player.deck.filter(c => c.title === 'Copper').length).toBe(6);
    expect(player.hand.filter(c => c.title === 'Estate').length + player.deck.filter(c => c.title === 'Estate').length).toBe(3);
    expect(game.boonPile.length).toBe(12);
  });

  test('should give money and a boon', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Tracker']);
    await waitForNextInput();
    respondWithCard('Tracker');
    await waitForNextInput();
    expect(player.money >= 1).toBe(true);
    expect(player.boonsReceivedThisTurn.length).toBe(1);
  });

  test('should allow gaining cards to deck, gained anyway', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    player.playArea.push(new Tracker(game));
    setHand(player, ['Workshop', 'Gold', 'Pouch', 'Pouch']);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    respondWithCard('Tracker');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Silver');
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithCard('Pouch');
    await waitForNextInput();
    respondWithCard('Pouch');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithCard('Tracker');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Estate');
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Estate');
  });

  test('Should be fine with Watchtower');

  test('Pouch should give money and buy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pouch']);
    await waitForNextInput();
    respondWithCard('Pouch');
    await waitForNextInput();
    expect(player.money).toBe(1);
    expect(player.buys).toBe(2);
  });
};
