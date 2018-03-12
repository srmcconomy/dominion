import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Rats'];
  });

  test('gains rats, trashes something', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Rats']);
    await waitForNextInput();
    respondWithCard('Rats');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(game.trash.last().title).toBe('Copper');
    expect(player.discardPile.last().title).toBe('Rats');
  });

  test('doesn\'t trash with only rats', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Rats', 'Rats', 'Rats', 'Rats', 'Rats']);
    setDeck(player, ['Rats', 'Rats', 'Rats', 'Rats', 'Rats']);
    await waitForNextInput();
    respondWithCard('Rats');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(game.trash.length).toBe(0);
    expect(player.discardPile.last().title).toBe('Rats');
  });

  test('on trash draws a card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'Rats']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['Rats']);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(game.trash.last().title).toBe('Rats');
  });

  test('should have 20 in supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Rats').cards.length).toBe(20);
  });
};
