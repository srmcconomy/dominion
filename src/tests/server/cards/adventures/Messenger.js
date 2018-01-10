import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCardFromHand, respondWithCardsFromHand, respondWithChoice, skipToNextTurn, respondWithSupply } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Messenger'];
  });

  test('should give 1 buy and 2 coins', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Messenger']);
    await waitForNextInput();
    respondWithCardFromHand('Messenger');
    await waitForNextInput();
    expect(player.buys).toBe(2);
    expect(player.money).toBe(2);
  });

  test('should allow you to put your deck into your discard pile', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Messenger']);
    await waitForNextInput();
    respondWithCardFromHand('Messenger');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();

    expect(player.discardPile.length).toBe(5);
    expect(player.deck.length).toBe(0);
  });

  test('should give you the option of not putting your deck in your discard pile', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Messenger']);
    await waitForNextInput();
    respondWithCardFromHand('Messenger');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();

    expect(player.discardPile.length).toBe(0);
    expect(player.deck.length).toBe(5);
  });

  test('if it is your first buy, it should give you the option of gaining a card costing up to 4 coin', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    player.money = 4;
    respondWithCardsFromHand([]);
    await waitForNextInput();
    respondWithSupply('Messenger');
    await waitForNextInput();
    respondWithSupply('Silver');
    const { lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(true);

    expect(player.discardPile.length).toBe(7);
    expect(player.discardPile).toHaveSome(c => c.title === 'Messenger');
    expect(player.discardPile).toHaveSome(c => c.title === 'Silver');
  });

  test('should give everyone else a copy of the chosen card on gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    const otherPlayer = game.playerOrder.find(p => p !== player);

    await waitForNextInput();
    player.money = 4;
    respondWithCardsFromHand([]);
    await waitForNextInput();
    respondWithSupply('Messenger');
    await waitForNextInput();
    respondWithSupply('Silver');
    const { lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.discardPile.length).toBe(1);
    expect(otherPlayer.discardPile.last().title).toBe('Silver');
  });

  test('should not trigger if it was not your first buy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);

    await waitForNextInput();
    player.money = 4;
    player.buys = 2;
    respondWithCardsFromHand([]);
    await waitForNextInput();
    respondWithSupply('Copper');
    await waitForNextInput();
    respondWithSupply('Messenger');
    const { input } = await waitForNextInput();
    expect(input.selectSupplies).toBe(undefined);
  });
};
