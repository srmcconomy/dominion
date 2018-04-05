import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Ambassador', 'Spoils'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Ambassador']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Attack');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Can return cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Estate', 'Estate', 'Ambassador']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Ambassador');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithCards(['Estate', 'Estate']);
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(otherPlayer.discardPile.last().title).toBe('Estate');
    expect(game.supplies.get('Estate').cards.length).toBe(9);
    expect(player.cardsOwned.length).toBe(8);
    expect(otherPlayer.cardsOwned.length).toBe(11);
  });

  test('Can return none', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Estate', 'Estate', 'Ambassador']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Ambassador');
    await waitForNextInput();
    respondWithCard('Estate');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(otherPlayer.discardPile.last().title).toBe('Estate');
    expect(game.supplies.get('Estate').cards.length).toBe(7);
    expect(player.cardsOwned.length).toBe(10);
    expect(otherPlayer.cardsOwned.length).toBe(11);
  });

  test('Works with shelters', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Hovel', 'Ambassador']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Ambassador');
    await waitForNextInput();
    respondWithCard('Hovel');
    await waitForNextInput();
    respondWithCards(['Hovel']);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(otherPlayer.discardPile.length).toBe(0);
    expect(player.cardsOwned.length).toBe(10);
    expect(otherPlayer.cardsOwned.length).toBe(10);
  });

  test('Works with spoils', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Spoils', 'Ambassador']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Ambassador');
    await waitForNextInput();
    respondWithCard('Spoils');
    await waitForNextInput();
    respondWithCards(['Spoils']);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(otherPlayer.discardPile.length).toBe(0);
    expect(game.supplies.get('Spoils').cards.length).toBe(15);
    expect(player.cardsOwned.length).toBe(10);
    expect(otherPlayer.cardsOwned.length).toBe(10);
  });

  test('Can return to Split piles');

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Estate', 'Estate', 'Ambassador']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Ambassador');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    respondWithCard('Estate');
    await waitForNextInput();
    respondWithCards(['Estate', 'Estate']);
    await waitForNextInput();
    expect(game.supplies.get('Estate').cards.length).toBe(10);
    expect(player.cardsOwned.length).toBe(8);
    expect(otherPlayer.cardsOwned.length).toBe(10);
  });
};
