import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn, respondWith, respondWithFirstCard, respondWithSupply } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Duplicate'];
  });

  test('should be put on the Tavern mat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Duplicate']);
    await waitForNextInput();
    respondWithCard('Duplicate');
    await waitForNextInput();

    expect(player.playArea.length).toBe(0);
    expect(player.mats.tavern.last().title).toBe('Duplicate');
  });

  test('should be able to be called when you gain a card costing up to 6 coins, gaining a copy of it', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Duplicate']);
    await waitForNextInput();
    respondWithCard('Duplicate');

    await skipToNextTurn(player);
    await waitForNextInput();
    respondWithCards([]);
    await waitForNextInput();
    respondWithSupply('Curse');

    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();

    expect([...player.deck, ...player.hand]).toHaveSome(c => c.title === 'Duplicate');
    expect(game.supplies.get('Curse').cards.length).toBe(8);
    const numCurses = [...player.deck, ...player.hand].filter(c => c.title === 'Curse').length;
    expect(numCurses).toBe(2);
  });

  test('should not be triggered when you gain a card costing more than 6 coins', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Duplicate']);
    await waitForNextInput();
    respondWithCard('Duplicate');

    await skipToNextTurn(player);
    await waitForNextInput();
    player.money = 8;
    respondWithCards([]);
    await waitForNextInput();
    respondWithSupply('Province');

    const { input } = await waitForNextInput();

    expect(input.selectOption).toNotBe(undefined);
  });
};
