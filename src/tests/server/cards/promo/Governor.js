import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Governor'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Governor']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should draw', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Governor']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Governor');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
    expect(otherPlayer.hand.length).toBe(6);
    expect(player.actions).toBe(1);
  });

  test('should gain treasures', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Governor']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Governor');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Gold');
    expect(otherPlayer.discardPile.last().title).toBe('Silver');
    expect(player.actions).toBe(1);
  });

  test('should remodle', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Silver', 'Governor']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Estate']);
    await waitForNextInput();
    respondWithCard('Governor');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Duchy');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(game.trash.some(c => c.title === 'Silver')).toBe(true);
    expect(player.discardPile.last().title).toBe('Duchy');
    expect(game.trash.some(c => c.title === 'Estate')).toBe(true);
    expect(otherPlayer.discardPile.last().title).toBe('Silver');
    expect(player.actions).toBe(1);
  });

  test('makes sure cards cost exatly, even with potion/debt');
};
