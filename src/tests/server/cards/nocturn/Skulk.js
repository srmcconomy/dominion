import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Skulk'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Skulk']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Attack');
    expect(card.types).toHave('Doom');
    expect(card.types.size).toBe(3);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should hex', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Skulk']);
    setHand(otherPlayer, []);
    setDeck(otherPlayer, []);
    await waitForNextInput();
    respondWithCard('Skulk');
    await waitForNextInput();
    expect(player.buys).toBe(2);
    expect(otherPlayer.hexsReceivedThisTurn.length).toBe(1);
    expect(game.hexPile.length).toBe(11);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('should gain gold on buy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Silver', 'Silver']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Skulk');
    await waitForNextInput();
    expect(player.discardPile.some(c=> c.title === 'Gold')).toBe(true);
  });

  test('should gain gold on gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Workshop', 'Silver']);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Skulk');
    await waitForNextInput();
    expect(player.discardPile.some(c=> c.title === 'Gold')).toBe(true);
  });
};
