import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => [];
  });

  test('Basic treasures should give proper amout of money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Platinum', 'Potion']);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(1);
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.money).toBe(3);
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.money).toBe(6);
    respondWithCard('Platinum');
    await waitForNextInput();
    expect(player.money).toBe(11);
    respondWithCard('Potion');
    await waitForNextInput();
    expect(player.potion).toBe(1);
  });

  test('Basic treasures should be played with PlayAll Button', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Platinum', 'Potion']);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.money).toBe(11);
    expect(player.potion).toBe(1);
    expect(player.hand.length).toBe(0);
  });

  test('Copper should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(0);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Silver should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Silver']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Gold should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(6);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Platinum should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Platinum']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(9);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Potion should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Potion']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });
};
