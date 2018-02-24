import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['SecretPassage'];
  });

  test('should place card on top of deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Copper', 'Copper', 'SecretPassage']);
    await waitForNextInput();
    respondWithCard('SecretPassage');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.deck.last().title).toBe('Silver');
  });

  test('should place card where you want', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Copper', 'Copper', 'SecretPassage']);
    setDeck(player, ['Gold', 'Silver', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('SecretPassage');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.deck.first().title).toBe('Silver');
  });
};
