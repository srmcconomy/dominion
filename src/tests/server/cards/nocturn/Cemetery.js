import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithSupply, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Cemetery'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Cemetery']);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('HauntedMirror should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['HauntedMirror']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types).toHave('Heirloom');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(0);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should add Haunted Mirror to starting deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    await waitForNextInput();
    expect(game.supplies.get('Copper').cards.length).toBe(48);
    expect(player.hand.filter(c => c.title === 'HauntedMirror').length + player.deck.filter(c => c.title === 'HauntedMirror').length).toBe(1);
    expect(player.hand.filter(c => c.title === 'Copper').length + player.deck.filter(c => c.title === 'Copper').length).toBe(6);
    expect(player.hand.filter(c => c.title === 'Estate').length + player.deck.filter(c => c.title === 'Estate').length).toBe(3);
  });

  test('should add ghost supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Ghost').cards.length).toBe(6);
  });

  test('should trash on gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Platinum', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Platinum');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Cemetery');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(game.trash.length).toBe(4);
    expect(player.discardPile.some(c => c.title === 'Cemetery')).toBe(true);
  });

  test('should be able to trash nothing', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Platinum', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Platinum');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Cemetery');
    await waitForNextInput();
    respondWithCards([]);
    await waitForNextInput();
    expect(game.trash.length).toBe(0);
    expect(player.discardPile.some(c => c.title === 'Cemetery')).toBe(true);
  });

  test('Haunted Mirror should give money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'HauntedMirror']);
    await waitForNextInput();
    respondWithCard('HauntedMirror');
    await waitForNextInput();
    expect(player.money).toBe(1);
  });

  test('Haunted Mirror should trash on gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Chapel', 'HauntedMirror', 'Village', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['HauntedMirror']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('HauntedMirror');
    expect(player.discardPile.some(c => c.title === 'Village')).toBe(true);
    expect(player.discardPile.last().title).toBe('Ghost');
    expect(player.hand.length).toBe(2);
    expect(game.supplies.get('Ghost').cards.length).toBe(5);
  });

  test('Haunted Mirror discard should be optional', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Chapel', 'HauntedMirror', 'Village', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['HauntedMirror']);
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(game.trash.last().title).toBe('HauntedMirror');
    expect(player.discardPile.length).toBe(0);
    expect(player.hand.length).toBe(3);
    expect(game.supplies.get('Ghost').cards.length).toBe(6);
  });
};
