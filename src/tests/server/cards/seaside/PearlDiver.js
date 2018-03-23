import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithFirstCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['PearlDiver'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['PearlDiver']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should move to top of deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'PearlDiver']);
    setDeck(player, ['Gold', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('PearlDiver');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.deck.last().title).toBe('Gold');
  });

  test('should stay if we choose so', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'PearlDiver']);
    setDeck(player, ['Gold', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('PearlDiver');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.deck.first().title).toBe('Gold');
  });
};
