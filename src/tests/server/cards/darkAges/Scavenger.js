import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Scavenger'];
  });

  test('should give $2, optional place in discard pile', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Scavenger']);
    setDiscardPile(player, ['Gold']);
    await waitForNextInput();
    respondWithCard('Scavenger');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Gold');
    expect(player.deck.length).toBe(6);
    expect(player.discardPile.length).toBe(0);
    expect(player.money).toBe(2);
  });

  test('should be able to move deck to discard and top deck one of them', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Scavenger']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Gold']);
    await waitForNextInput();
    respondWithCard('Scavenger');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Gold');
    expect(player.deck.length).toBe(1);
    expect(player.discardPile.length).toBe(4);
    expect(player.money).toBe(2);
  });
};
