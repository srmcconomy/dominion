import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Feodum'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Feodum']);
    const card = player.hand.last();
    expect(card.types).toHave('Victory');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Feodum should be worth 0', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Copper', 'Copper', 'Feodum']);
    setDeck(player, ['Copper', 'Copper', 'Silver', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(0);
  });

  test('Feodum should be worth 1', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Copper', 'Copper', 'Feodum']);
    setDeck(player, ['Feodum', 'Copper', 'Silver', 'Silver']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(2);
  });

  test('On trash gains 3 silvers', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Chapel', 'Copper', 'Copper', 'Feodum']);
    setDeck(player, ['Feodum', 'Copper', 'Silver', 'Silver']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['Feodum']);
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'Silver').length).toBe(3);
    expect(game.trash.last().title).toBe('Feodum');
  });
};
