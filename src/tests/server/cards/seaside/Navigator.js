import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Navigator'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Navigator']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
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
