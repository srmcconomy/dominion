import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, setStartingDeck, respondWithChoice } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Library'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Library']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should draw to 7 cards from 5 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Library']);
    await waitForNextInput();
    respondWithCard('Library');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
  });

  test('should draw to 7 cards from 1 card', async () => {
    setStartingDeck([...Array(30)].map(() => 'Copper'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Library']);
    await waitForNextInput();
    respondWithCard('Library');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
  });

  test('should ask to set aside any actions', async () => {
    setStartingDeck([
      ...[...Array(7)].map(() => 'Copper'),
      'Village',
      'Chapel',
      ...[...Array(7)].map(() => 'Copper'),
    ]);
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Library']);
    await waitForNextInput();
    respondWithCard('Library');
    await waitForNextInput();

    respondWithFirstCard();
    let { lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(true);

    respondWithNoCards();
    ({ lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(player.hand.length).toBe(7);
    expect(player.hand.filter(c => c.title === 'Chapel').length).toBe(1);
  });
};
