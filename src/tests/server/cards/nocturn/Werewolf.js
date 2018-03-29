import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Werewolf'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Werewolf']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Night');
    expect(card.types).toHave('Attack');
    expect(card.types).toHave('Doom');
    expect(card.types.size).toBe(4);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should draw', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Werewolf']);
    await waitForNextInput();
    respondWithCard('Werewolf');
    await waitForNextInput();
    expect(player.hand.length).toBe(7);
  });

  test('should hex', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Werewolf', 'Werewolf']);
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Werewolf');
    await waitForNextInput();
    expect(otherPlayer.hexsReceivedThisTurn.length).toBe(1);
    expect(game.hexPile.length).toBe(11);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('should be blocked by moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Werewolf']);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Werewolf');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.hexsReceivedThisTurn.length).toBe(0);
    expect(game.hexPile.length).toBe(11);
    expect(game.hexDiscardPile.length).toBe(1);
  });
};
