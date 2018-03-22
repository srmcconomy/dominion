import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => [];
  });

  test('Estate should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate']);
    setDeck(player, []);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(1);
  });

  test('Duchy should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Duchy']);
    setDeck(player, []);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(3);
  });

  test('Province should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Province']);
    setDeck(player, []);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(8);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(6);
  });

  test('Colony should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Colony']);
    setDeck(player, []);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(11);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(10);
  });
};
