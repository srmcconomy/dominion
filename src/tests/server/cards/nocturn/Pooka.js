import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Pooka'];
  });

  test('should add Cursed Gold to starting deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'CursedGold').length + player.deck.filter(c => c.title === 'CursedGold').length).toBe(1);
    expect(player.hand.filter(c => c.title === 'Copper').length + player.deck.filter(c => c.title === 'Copper').length).toBe(6);
    expect(player.hand.filter(c => c.title === 'Estate').length + player.deck.filter(c => c.title === 'Estate').length).toBe(3);
  });

  test('Should trash and draw', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pooka']);
    await waitForNextInput();
    respondWithCard('Pooka');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
    expect(game.trash.last().title).toBe('Copper');
  });

  test('trash should be optional', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pooka']);
    await waitForNextInput();
    respondWithCard('Pooka');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(game.trash.length).toBe(0);
  });

  test('should be fine with no trash targets', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Estate', 'Estate', 'Estate', 'Pooka']);
    await waitForNextInput();
    respondWithCard('Pooka');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(game.trash.length).toBe(0);
  });

  test('Cursed Gold gains Curses', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Estate', 'Estate', 'Estate', 'CursedGold']);
    await waitForNextInput();
    respondWithCard('CursedGold');
    await waitForNextInput();
    expect(player.money).toBe(3);
    expect(player.discardPile.last().title).toBe('Curse');
  });
};
