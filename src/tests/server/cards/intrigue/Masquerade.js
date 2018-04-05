import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Masquerade'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Masquerade']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should pass cards and trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Copper', 'Curse', 'Masquerade']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Duchy', 'Copper', 'Copper', 'Estate']);
    await waitForNextInput();
    respondWithCard('Masquerade');
    const { player: inputPlayer } = await waitForNextInput();
    if (inputPlayer === player) {
      respondWithCard('Silver');
      await waitForNextInput();
      respondWithCard('Duchy');
    } else {
      respondWithCard('Duchy');
      await waitForNextInput();
      respondWithCard('Silver');
    }
    await waitForNextInput();
    respondWithCard('Curse');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(game.trash.last().title).toBe('Curse');
    expect(player.cardsOwned.some(c => c.title === 'Duchy')).toBe(true);
    expect(player.cardsOwned.some(c => c.title === 'Silver')).toBe(false);
    expect(otherPlayer.cardsOwned.some(c => c.title === 'Silver')).toBe(true);
    expect(otherPlayer.cardsOwned.some(c => c.title === 'Duchy')).toBe(false);
  });
};
