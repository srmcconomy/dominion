import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Page'];
  });

  test('should give 2 cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Warrior']);
    await waitForNextInput();
    respondWithCard('Warrior');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
  });

  test('should attack other players based on how many Travellers are in play');

  test('should trigger when it is discarded from play', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Warrior']);
    await waitForNextInput();
    respondWithCard('Warrior');
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

  test('should not trigger when there are no Heroes in the Supply', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Warrior']);

    game.supplies.get('Hero').cards.clear();

    await waitForNextInput();
    respondWithCard('Warrior');
    await waitForNextInput();
    respondWithCards([]); // choose treasures
    await waitForNextInput();
    respondWithChoice(0); // end turn

    const { player: inputPlayer } = await waitForNextInput();
    expect(inputPlayer).toNotBe(player);
  });

  test('should get exchanged for a Hero', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Warrior']);

    await waitForNextInput();

    respondWithCard('Warrior');
    await waitForNextInput();
    respondWithCards([]); // choose treasures
    await waitForNextInput();
    respondWithChoice(0); // end turn
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();

    expect(game.supplies.get('Warrior').cards.length).toBe(6);
    expect(game.supplies.get('Hero').cards.length).toBe(4);
    expect([...player.deck, ...player.hand]).toHaveSome(c => c.title === 'Hero');
  });
};
