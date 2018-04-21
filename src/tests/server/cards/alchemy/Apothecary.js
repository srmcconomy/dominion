import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Apothecary'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Apothecary']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(1);
    expect(card.cost.debt).toBe(0);
  });

  test('should create Potion Supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Potion').cards.length).toBe(16);
  });

  test('should draw and inspect deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Apothecary']);
    setDeck(player, ['Potion', 'Silver', 'Gold', 'Copper', 'Duchy']);
    await waitForNextInput();
    respondWithCard('Apothecary');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(1);
    expect(player.hand.some(c => c.title === 'Duchy')).toBe(true);
    expect(player.hand.some(c => c.title === 'Copper')).toBe(true);
    expect(player.hand.some(c => c.title === 'Potion')).toBe(true);
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Silver');
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Gold');
  });

  test('should be fine with empty deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Apothecary']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('Apothecary');
    await waitForNextInput();
    expect(player.hand.length).toBe(0);
    expect(player.actions).toBe(1);
    respondWithSupply('Curse');
    await waitForNextInput();
    expect(player.hand.last().title).toBe('Curse');
  });
};
