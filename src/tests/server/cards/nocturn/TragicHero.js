import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['TragicHero'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['TragicHero']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should draw and give buy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'TragicHero']);
    await waitForNextInput();
    respondWithCard('TragicHero');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
    expect(player.buys).toBe(2);
  });

  test('should trash and gain treasure', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Laboratory', 'TragicHero']);
    await waitForNextInput();
    respondWithCard('Laboratory');
    await waitForNextInput();
    respondWithCard('TragicHero');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(8);
    expect(player.buys).toBe(2);
    expect(player.playArea.length).toBe(1);
    expect(player.discardPile.last().title).toBe('Gold')
    expect(game.trash.last().title).toBe('TragicHero');
  });

  test('should work with Throne Room', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'ThroneRoom', 'Laboratory', 'Laboratory', 'TragicHero']);
    setDeck(player, Array(20).fill('Copper'));
    await waitForNextInput();
    respondWithCard('Laboratory');
    await waitForNextInput();
    respondWithCard('Laboratory');
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('TragicHero');
    await waitForNextInput();
    expect(player.hand.length).toBe(8);
    expect(player.buys).toBe(2);
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(player.playArea.length).toBe(3);
    expect(player.discardPile.last().title).toBe('Gold')
    expect(game.trash.last().title).toBe('TragicHero');

    expect(player.hand.length).toBe(11);
    expect(player.buys).toBe(3);
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.playArea.length).toBe(3);
    expect(player.discardPile.last().title).toBe('Silver')
    expect(game.trash.last().title).toBe('TragicHero');
  });
};
