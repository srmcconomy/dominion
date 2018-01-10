import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCardFromHand, respondWithCardsFromHand, respondWithChoice, skipToNextTurn } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Page'];
  });

  test('should give 1 card and 1 action', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Page']);
    await waitForNextInput();
    respondWithCardFromHand('Page');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
  });

  test('should trigger when it is discarded from play', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Page']);
    await waitForNextInput();
    respondWithCardFromHand('Page');
    await waitForNextInput();
    respondWithCardsFromHand([]); // choose treasures
    await waitForNextInput();
    respondWithChoice(0); // end turn

    const { player: inputPlayer, } = await waitForNextInput();
    expect(inputPlayer).toBe(player);
    respondWithFirstCard();

    const { lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(true);
  });

  test('should not trigger when there are no Treasure Hunters in the Supply', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Page']);

    game.supplies.get('TreasureHunter').cards.clear();

    await waitForNextInput();
    respondWithCardFromHand('Page');
    await waitForNextInput();
    respondWithCardsFromHand([]); // choose treasures
    await waitForNextInput();
    respondWithChoice(0); // end turn

    const { player: inputPlayer } = await waitForNextInput();
    expect(inputPlayer).toNotBe(player);
  });

  test('should get exchanged for a Treasure Hunter', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Page']);

    await waitForNextInput();

    respondWithCardFromHand('Page');
    await waitForNextInput();
    respondWithCardsFromHand([]); // choose treasures
    await waitForNextInput();
    respondWithChoice(0); // end turn
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();

    expect(game.supplies.get('Page').cards.length).toBe(11);
    expect(game.supplies.get('TreasureHunter').cards.length).toBe(4);
    expect([...player.deck, ...player.hand]).toHaveSome(c => c.title === 'TreasureHunter');
  });
};
