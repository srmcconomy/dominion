import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Embargo'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Embargo']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give money and trash self', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Embargo']);
    await waitForNextInput();
    respondWithCard('Embargo');
    await waitForNextInput();
    respondWithSupply('Embargo');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Embargo');
    expect(player.money).toBe(2);
  });

  test('should curse', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Embargo']);
    await waitForNextInput();
    respondWithCard('Embargo');
    await waitForNextInput();
    respondWithSupply('Embargo');
    await skipToNextTurn(player);

    setHand(player, ['Silver']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Embargo');
    await waitForNextInput();
    expect(player.discardPile.some(c => c.title === 'Curse')).toBe(true);
  });

  test('should stack', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Village', 'Village', 'Embargo', 'Embargo', 'Embargo']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Embargo');
    await waitForNextInput();
    respondWithSupply('Embargo');
    await waitForNextInput();
    respondWithCard('Embargo');
    await waitForNextInput();
    respondWithSupply('Embargo');
    await waitForNextInput();
    respondWithCard('Embargo');
    await waitForNextInput();
    respondWithSupply('Embargo');
    await skipToNextTurn(player);

    setHand(player, ['Silver']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Embargo');
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'Curse').length).toBe(3);
  });
};
