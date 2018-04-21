import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Mystic'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Mystic']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should draw if named correctly', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mystic']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Gold']);
    await waitForNextInput();
    respondWithCard('Mystic');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.hand.last().title).toBe('Gold');
    expect(player.deck.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(2);
  });

  test('should not if named wrong', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mystic']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Gold']);
    await waitForNextInput();
    respondWithCard('Mystic');
    await waitForNextInput();
    respondWithSupply('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.deck.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(2);
  });

  test('should be fine if empty deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mystic']);
    setDeck(player, []);
    await waitForNextInput();
    respondWithCard('Mystic');
    await waitForNextInput();
    respondWithSupply('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.deck.length).toBe(0);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(2);
  });
};
