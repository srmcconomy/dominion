import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Exorcist'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Exorcist']);
    const card = player.hand.last();
    expect(card.types).toHave('Night');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should add spirit supplies', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('WillOWisp').cards.length).toBe(12);
    expect(game.supplies.get('Imp').cards.length).toBe(13);
    expect(game.supplies.get('Ghost').cards.length).toBe(6);
  });

  test('should gain ghosts', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Exorcist', 'Duchy', 'Exorcist']);
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Exorcist');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Ghost');
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Duchy');
    expect(game.supplies.get('Ghost').cards.length).toBe(5);
  });

  test('should gain imps', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Exorcist', 'Duchy', 'Exorcist']);
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Exorcist');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Imp');
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Duchy');
    expect(game.supplies.get('Imp').cards.length).toBe(12);
  });

  test('should gain Will O\' Wisp', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Exorcist', 'Estate', 'Exorcist']);
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Exorcist');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('WillOWisp');
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Estate');
    expect(game.supplies.get('WillOWisp').cards.length).toBe(11);
  });

  test('should work with empty spirit piles', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.supplies.get('Imp').cards.clear();
    setHand(player, ['Copper', 'Copper', 'Exorcist', 'Duchy', 'Exorcist']);
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Exorcist');
    await waitForNextInput();
    respondWithCard('Duchy');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Ghost');
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Duchy');
    expect(game.supplies.get('Ghost').cards.length).toBe(5);
  });

  test('should gain nothing on curse trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Exorcist', 'Curse', 'Exorcist']);
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Exorcist');
    await waitForNextInput();
    respondWithCard('Curse');
    await waitForNextInput();
    respondWithCard('Exorcist');
    await waitForNextInput();
    expect(player.discardPile.length).toBe(0);
    expect(player.hand.length).toBe(2);
    expect(game.trash.last().title).toBe('Curse');
  });

  test('should work with potion/debt cost cards');
};
