import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Courtyard'];
  });

  test('draws 3 puts one back', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Courtyard']);
    setDeck(player, ['Silver', 'Gold', 'Silver', 'Silver']);
    await waitForNextInput();
    respondWithCard('Courtyard');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.deck.last().title).toBe('Gold');
  });

  test('wroks with empty deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold', 'Copper', 'Copper', 'Copper', 'Courtyard']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('Courtyard');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.deck.last().title).toBe('Gold');
  });
};
