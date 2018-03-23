import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Stonemason', 'Village'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Stonemason']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should trash and allow two gains', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Silver', 'Stonemason']);
    await waitForNextInput();
    respondWithCard('Stonemason');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.discardPile.filter(c => c.title === 'Estate').length).toBe(2);
    expect(game.trash.last().title).toBe('Silver');
  });

  test('overpay should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Silver', 'Silver', 'Silver', 'Estate']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Stonemason');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithSupply('Village');
    await waitForNextInput();
    respondWithSupply('Village');
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'Stonemason').length).toBe(1);
    expect(player.discardPile.filter(c => c.title === 'Village').length).toBe(2);
  });
};
