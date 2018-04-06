import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithNoCards, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['WalledVillage'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['WalledVillage']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should be a village and move onto deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'WalledVillage']);
    setDeck(player, Array(20).fill('Copper'));
    await waitForNextInput();
    respondWithCard('WalledVillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);

    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('WalledVillage');
    await waitForNextInput();
    expect(player.hand.some(c => c.title === 'WalledVillage')).toBe(true);
  });

  test('should  top deck if playerd one card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Smithy', 'WalledVillage']);
    setDeck(player, Array(20).fill('Copper'));
    await waitForNextInput();
    respondWithCard('WalledVillage');
    await waitForNextInput();
    respondWithCard('Smithy');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
    expect(player.actions).toBe(1);

    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('WalledVillage');
    await waitForNextInput();
    expect(player.hand.some(c => c.title === 'WalledVillage')).toBe(true);
  });

  test('should not top deck if playerd two cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Smithy', 'Smithy', 'WalledVillage']);
    setDeck(player, Array(20).fill('Copper'));
    await waitForNextInput();
    respondWithCard('WalledVillage');
    await waitForNextInput();
    respondWithCard('Smithy');
    await waitForNextInput();
    respondWithCard('Smithy');
    await waitForNextInput();
    expect(player.hand.length).toBe(9);
    expect(player.actions).toBe(0);

    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    expect(player.hand.some(c => c.title === 'WalledVillage')).toBe(false);
  });
};
