import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithSupply, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Fortress'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Fortress']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('works as a village', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Fortress']);
    await waitForNextInput();
    respondWithCard('Fortress');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
  });

  test('chapel trashing returns it to hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'Fortress']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper', 'Fortress']);
    await waitForNextInput();
    expect(player.hand.length).toBe(1);
    expect(game.trash.length).toBe(3);
    expect(player.cardsOwned.some(c => c.title === 'Fortress')).toBe(true);
  });

  test('remodel trashing returns it to hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Remodel', 'Fortress']);
    await waitForNextInput();
    respondWithCard('Remodel');
    await waitForNextInput();
    respondWithCard('Fortress');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(game.trash.length).toBe(0);
  });

  test('lurker trashing returns it to hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Lurker', 'Copper']);
    await waitForNextInput();
    respondWithCard('Lurker');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithSupply('Fortress');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(game.trash.length).toBe(0);
    expect(game.supplies.get('Fortress').cards.length).toBe(9);
  });
};
