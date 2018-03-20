import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, skipToNextTurn, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['SecretCave'];
  });

  test('should add Magic Lamp to starting deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    await waitForNextInput();
    expect(game.supplies.get('Copper').cards.length).toBe(48);
    expect(player.hand.filter(c => c.title === 'MagicLamp').length + player.deck.filter(c => c.title === 'MagicLamp').length).toBe(1);
    expect(player.hand.filter(c => c.title === 'Copper').length + player.deck.filter(c => c.title === 'Copper').length).toBe(6);
    expect(player.hand.filter(c => c.title === 'Estate').length + player.deck.filter(c => c.title === 'Estate').length).toBe(3);
  });

  test('should allow discard for money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SecretCave']);
    await waitForNextInput();
    respondWithCard('SecretCave');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(2);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.money).toBe(3);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
    expect(player.money).toBe(0);
  });

  test('magic lamp should trash for Wishes', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Village', 'Smithy', 'Laboratory', 'Copper', 'Silver', 'MagicLamp']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Smithy');
    await waitForNextInput();
    respondWithCard('Laboratory');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('MagicLamp');
    await waitForNextInput();
    expect(player.playArea.length).toBe(5);
    expect(player.discardPile.filter(c => c.title === 'Wish').length).toBe(3);
    expect(player.money).toBe(4);
  });

  test('magic lamp should not trash with duplicates Wishes', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Village', 'Smithy', 'Laboratory', 'Copper', 'Silver', 'Copper', 'MagicLamp']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Smithy');
    await waitForNextInput();
    respondWithCard('Laboratory');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('MagicLamp');
    await waitForNextInput();
    expect(player.playArea.length).toBe(7);
    expect(player.discardPile.length).toBe(0);
    expect(player.money).toBe(5);
  });

  test('magic lamp should not trash with less than 6', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['MagicLamp']);
    await waitForNextInput();
    respondWithCard('MagicLamp');
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.discardPile.length).toBe(0);
    expect(player.money).toBe(1);
  });
};
