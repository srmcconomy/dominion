import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Journeyman'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Journeyman']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should filter out cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Journeyman']);
    setDeck(player, ['Estate', 'Copper', 'Estate', 'Copper', 'Estate']);
    await waitForNextInput();
    respondWithCard('Journeyman');
    await waitForNextInput();
    respondWithSupply('Copper');
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Estate').length).toBe(3);
    expect(player.discardPile.length).toBe(2);
  });

  test('should filter out cards from discardPile even if not enough exist', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Journeyman']);
    setDeck(player, ['Copper', 'Estate']);
    setDiscardPile(player, ['Estate', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Journeyman');
    await waitForNextInput();
    respondWithSupply('Copper');
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Estate').length).toBe(2);
    expect(player.discardPile.length).toBe(3);
  });
};
