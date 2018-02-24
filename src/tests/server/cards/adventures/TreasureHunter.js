import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Page'];
  });

  test('should give 1 action and 1 coin', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'TreasureHunter']);
    await waitForNextInput();
    respondWithCard('TreasureHunter');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
  });

  test('should give 1 Silver per card the player to the right gained', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await skipToNextTurn(otherPlayer);

    const numCardsToBuy = 20;

    await waitForNextInput();
    otherPlayer.buys = numCardsToBuy;
    respondWithCards([]);
    for (let i = 0; i < numCardsToBuy; i++) {
      await waitForNextInput();
      respondWithSupply('Copper');
    }
    await skipToNextTurn(player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'TreasureHunter']);
    await waitForNextInput();
    respondWithCard('TreasureHunter');
    await waitForNextInput();
    expect(player.cardsGainedThisTurn.length).toBe(numCardsToBuy);
    expect(player.cardsGainedThisTurn).toNotHaveSome(c => c.title !== 'Silver');
  });

  test('should trigger when it is discarded from play', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'TreasureHunter']);
    await waitForNextInput();
    respondWithCard('TreasureHunter');
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

  test('should not trigger when there are no Warriors in the Supply', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'TreasureHunter']);

    game.supplies.get('Warrior').cards.clear();

    await waitForNextInput();
    respondWithCard('TreasureHunter');
    await waitForNextInput();
    respondWithCards([]); // choose treasures
    await waitForNextInput();
    respondWithChoice(0); // end turn

    const { player: inputPlayer } = await waitForNextInput();
    expect(inputPlayer).toNotBe(player);
  });

  test('should get exchanged for a Warrior', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'TreasureHunter']);

    await waitForNextInput();

    respondWithCard('TreasureHunter');
    await waitForNextInput();
    respondWithCards([]); // choose treasures
    await waitForNextInput();
    respondWithChoice(0); // end turn
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();

    expect(game.supplies.get('TreasureHunter').cards.length).toBe(6);
    expect(game.supplies.get('Warrior').cards.length).toBe(4);
    expect(player.discardPile).toHaveSome(c => c.title === 'Warrior');
  });
};
