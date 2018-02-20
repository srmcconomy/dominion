import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Beggar'];
  });

  test('should gain coppers to hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Beggar']);
    await waitForNextInput();
    respondWithCard('Beggar');
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Copper').length).toBe(7);
    expect(player.discardPile.length).toBe(0);
  });

  test('should react to attacks', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Militia']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Beggar']);
    await waitForNextInput();
    respondWithCard('Militia');
    await waitForNextInput();
    respondWithCard('Beggar');
    await waitForNextInput();
    expect(otherPlayer.discardPile.last().title).toBe('Silver');
    expect(otherPlayer.discardPile.length).toBe(2);
    expect(otherPlayer.deck.last().title).toBe('Silver');
  });
};
