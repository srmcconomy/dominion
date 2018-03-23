import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithFirstCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['MiningVillage'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['MiningVillage']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should act as a village', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'MiningVillage']);
    await waitForNextInput();
    respondWithCard('MiningVillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
  });

  test('should allow trashing for money', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'MiningVillage']);
    await waitForNextInput();
    respondWithCard('MiningVillage');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
    expect(player.money).toBe(2);
    expect(player.playArea.length).toBe(0);
    expect(game.trash.last().title).toBe('MiningVillage');
  });

  test('trash shoud be optional', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'MiningVillage']);
    await waitForNextInput();
    respondWithCard('MiningVillage');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
    expect(player.money).toBe(0);
    expect(player.playArea.length).toBe(1);
    expect(game.trash.length).toBe(0);
  });

  test('throneroom should only allow trashing once', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'ThroneRoom', 'MiningVillage']);
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('MiningVillage');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(4);
    expect(player.money).toBe(2);
    expect(player.playArea.length).toBe(1);
    expect(game.trash.last().title).toBe('MiningVillage');

    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.money).toBe(3);
  });
};
