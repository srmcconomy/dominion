import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Count'];
  });

  test('first options should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Silver', 'Count']);
    await waitForNextInput();
    respondWithCard('Count');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCards(['Silver', 'Silver']);
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'Silver').length).toBe(2);
    expect(player.hand.length).toBe(2);
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.money).toBe(3);
  });

  test('second options should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Silver', 'Count']);
    await waitForNextInput();
    respondWithCard('Count');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Silver');
    expect(player.hand.length).toBe(3);
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(0);
    expect(game.trash.length).toBe(3);
  });

  test('third options should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Silver', 'Count']);
    await waitForNextInput();
    respondWithCard('Count');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Copper');
    respondWithChoice(2);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Duchy');
  });

  test('trash hand should work with Fortress', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Fortress', 'Fortress', 'Count']);
    await waitForNextInput();
    respondWithCard('Count');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Copper');
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Fortress');
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(game.trash.length).toBe(2);
  });

  test('trash hand should work with Rats', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Rats', 'Rats', 'Count']);
    await waitForNextInput();
    respondWithCard('Count');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Copper');
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Rats');
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(game.trash.length).toBe(4);
  });
};
