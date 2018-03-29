import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, setDiscardPile, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Harbinger'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Harbinger']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should have 1 action and 5 cards after playing', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Harbinger']);
    await waitForNextInput();
    respondWithCard('Harbinger');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.hand.length).toBe(5);
  });

  test('should topDeck a card from discardPile', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Harbinger']);
    setDiscardPile(player, ['Gold']);
    await waitForNextInput();
    respondWithCard('Harbinger');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Gold');
    expect(player.discardPile.length).toBe(0);
  });
};
