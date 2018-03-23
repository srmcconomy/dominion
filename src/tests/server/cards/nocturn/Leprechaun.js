import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Leprechaun'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Leprechaun']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Doom');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should hex');// , async () => {
  //   const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
  //   setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
  //   await waitForNextInput();
  //   respondWithCard('Market');
  //   await waitForNextInput();
  //   expect(player.hand.length).toBe(5);
  //   expect(player.actions).toBe(1);
  //   expect(player.buys).toBe(2);
  //   expect(player.money).toBe(1);
  // });

  test('should give wish when condition met', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Village', 'Village', 'Village', 'Village', 'Village', 'Village', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.discardPile.some(c => c.title === 'Gold')).toBe(true);
    expect(player.discardPile.last().title).toBe('Wish');
  });

  test('should add wish supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Wish').cards.length).toBe(12);
  });
};
