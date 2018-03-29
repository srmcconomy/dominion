import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Nobles'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Nobles']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(6);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should draw', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Nobles']);
    await waitForNextInput();
    respondWithCard('Nobles');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
    expect(player.actions).toBe(0);
  });

  test('should give actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Nobles']);
    await waitForNextInput();
    respondWithCard('Nobles');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(2);
  });

  test('Nobles should be worth 2', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Nobles']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(2);
  });
};