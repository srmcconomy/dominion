import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Shepherd'];
  });

  test('should add Pasture to starting deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    await waitForNextInput();
    expect(game.supplies.get('Copper').cards.length).toBe(48);
    expect(player.hand.filter(c => c.title === 'Pasture').length + player.deck.filter(c => c.title === 'Pasture').length).toBe(1);
    expect(player.hand.filter(c => c.title === 'Copper').length + player.deck.filter(c => c.title === 'Copper').length).toBe(6);
    expect(player.hand.filter(c => c.title === 'Estate').length + player.deck.filter(c => c.title === 'Estate').length).toBe(3);
  });

  test('should draw 2 for each discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Pasture', 'Mill', 'Copper', 'Copper', 'Shepherd']);
    await waitForNextInput();
    respondWithCard('Shepherd');
    await waitForNextInput();
    respondWithCards(['Pasture', 'Mill']);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
  });

  test('should draw card discarded', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Copper', 'Shepherd']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('Shepherd');
    await waitForNextInput();
    respondWithCards(['Estate']);
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(player.hand.last().title).toBe('Estate');
    expect(player.actions).toBe(1);
  });

  test('Pasture should give money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pasture']);
    await waitForNextInput();
    respondWithCard('Pasture');
    await waitForNextInput();
    expect(player.money).toBe(1);
  });

  test('Pasture should scale with Estates', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Pasture']);
    setDeck(player, ['Estate', 'Estate', 'Estate']);
    await waitForNextInput();

    game.endOfGame();
    expect(player.score).toBe(6);
  });
};
