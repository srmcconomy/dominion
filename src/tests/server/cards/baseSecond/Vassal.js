import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithFirstCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Vassal'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Vassal']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should chain Vassals and play Actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vassal']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Smithy', 'Vassal']);
    await waitForNextInput();
    respondWithCard('Vassal');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.actions).toBe(0);
    expect(player.hand.length).toBe(7);
    expect(player.money).toBe(4);
  });

  test('should be able to stop chain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Vassal']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Smithy', 'Vassal']);
    await waitForNextInput();
    respondWithCard('Vassal');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.actions).toBe(0);
    expect(player.hand.length).toBe(4);
    expect(player.money).toBe(4);
    expect(player.deck.length).toBe(3);
    expect(player.discardPile.last().title).toBe('Smithy');

    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.money).toBe(5);
  });
};
