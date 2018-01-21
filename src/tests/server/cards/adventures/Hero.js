import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Page'];
  });

  test('should give 2 coins', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hero']);
    await waitForNextInput();
    respondWithCard('Hero');
    await waitForNextInput();
    expect(player.money).toBe(2);
  });

  test('should allow the player to gain a treasure', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hero']);
    await waitForNextInput();
    respondWithCard('Hero');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();

    expect(player.cardsGainedThisTurn[0].title).toBe('Gold');
  });

  test('should trigger when it is discarded from play', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hero']);
    await waitForNextInput();
    respondWithCard('Hero');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    respondWithCards([]); // choose treasures
    await waitForNextInput();
    respondWithChoice(0); // end turn

    const { player: inputPlayer, } = await waitForNextInput();
    expect(inputPlayer).toBe(player);
    respondWithFirstCard();

    const { lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(true);
  });

  test('should not trigger when there are no Champions in the Supply', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hero']);

    game.supplies.get('Champion').cards.clear();

    await waitForNextInput();
    respondWithCard('Hero');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    respondWithCards([]); // choose treasures
    await waitForNextInput();
    respondWithChoice(0); // end turn

    const { player: inputPlayer } = await waitForNextInput();
    expect(inputPlayer).toNotBe(player);
  });

  test('should get exchanged for a Champion', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Hero']);

    await waitForNextInput();

    respondWithCard('Hero');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    respondWithCards([]); // choose treasures
    await waitForNextInput();
    respondWithChoice(0); // end turn
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();

    expect(game.supplies.get('Hero').cards.length).toBe(6);
    expect(game.supplies.get('Champion').cards.length).toBe(4);
    expect(player.discardPile).toHaveSome(c => c.title === 'Champion');
  });
};
