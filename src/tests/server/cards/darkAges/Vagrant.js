import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Vagrant'];
  });

  test('should draw curses', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vagrant']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Curse', 'Copper']);
    await waitForNextInput();
    respondWithCard('Vagrant');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.deck.length).toBe(3);
    expect(player.actions).toBe(1);
  });

  test('should draw ruins', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vagrant']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Survivors', 'Copper']);
    await waitForNextInput();
    respondWithCard('Vagrant');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.deck.length).toBe(3);
    expect(player.actions).toBe(1);
  });

  test('should draw shelters', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vagrant']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Necropolis', 'Copper']);
    await waitForNextInput();
    respondWithCard('Vagrant');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.deck.length).toBe(3);
    expect(player.actions).toBe(1);
  });

  test('should draw victory cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vagrant']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Estate', 'Copper']);
    await waitForNextInput();
    respondWithCard('Vagrant');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.deck.length).toBe(3);
    expect(player.actions).toBe(1);
  });

  test('should draw split victory cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vagrant']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Mill', 'Copper']);
    await waitForNextInput();
    respondWithCard('Vagrant');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.deck.length).toBe(3);
    expect(player.actions).toBe(1);
  });

  test('shouldn\'t draw action cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vagrant']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Vagrant', 'Copper']);
    await waitForNextInput();
    respondWithCard('Vagrant');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.deck.length).toBe(4);
    expect(player.actions).toBe(1);
  });

  test('shouldn\'t draw trause cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vagrant']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Vagrant');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.deck.length).toBe(4);
    expect(player.actions).toBe(1);
  });
};
