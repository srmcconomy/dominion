import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Navigator'];
  });

  test('can discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Navigator']);
    await waitForNextInput();
    respondWithCard('Navigator');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.actions).toBe(0);
    expect(player.money).toBe(2);
    expect(player.discardPile.length).toBe(5);
  });

  test('can rearange and put on top', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Navigator']);
    setDeck(player, ['Copper', 'Copper', 'Province', 'Gold', 'Copper']);
    await waitForNextInput();
    respondWithCard('Navigator');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Province');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.actions).toBe(0);
    expect(player.money).toBe(2);
    expect(player.discardPile.length).toBe(0);
    expect(player.deck.last().title).toBe('Gold');
  });
};
