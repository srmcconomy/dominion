import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Soothsayer'];
  });

  test('should gain gold and attack', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Soothsayer']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('Soothsayer');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Gold');
    expect(otherPlayer.discardPile.last().title).toBe('Curse');
    expect(otherPlayer.hand.length).toBe(6);
  });

  test('curses trashed with watchtower still result in a card drawn');

  test('curses turned into silvers with trader don\'t result in a card drawn');

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Soothsayer']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Soothsayer');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(player.discardPile.last().title).toBe('Gold');
    expect(otherPlayer.discardPile.length).toBe(0);
    expect(otherPlayer.hand.length).toBe(5);
  });
};
