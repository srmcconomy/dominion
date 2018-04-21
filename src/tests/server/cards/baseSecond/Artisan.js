import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithSupply, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Workshop', 'Witch', 'Artisan'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Artisan']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(6);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should gain 5 cost cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Artisan']);
    await waitForNextInput();
    respondWithCard('Artisan');
    await waitForNextInput();
    respondWithSupply('Witch');
    const { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Witch');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Witch');
    expect(game.supplies.get('Witch').cards.length).toBe(9);
    expect(player.hand.length).toBe(4);
  });

  test('shouldn\'t gain 6 cost cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Artisan']);
    await waitForNextInput();
    respondWithCard('Artisan');
    await waitForNextInput();
    respondWithSupply('Artisan');
    const { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(false);
    expect(player.discardPile.length).toBe(0);
    expect(player.hand.length).toBe(4);
  });

  test('shouldn\'t gain from an empty supply', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.supplies.get('Workshop').cards.clear();
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Artisan']);
    await waitForNextInput();
    respondWithCard('Artisan');
    await waitForNextInput();
    respondWithSupply('Workshop');
    const { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(false);
    expect(player.discardPile.length).toBe(0);
    expect(game.supplies.get('Workshop').cards.length).toBe(0);
  });

  test('shouldn\'t gain Potion cost cards');

  test('shouldn\'t gain Debt cost cards');
};
