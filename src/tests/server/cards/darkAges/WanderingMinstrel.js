import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['WanderingMinstrel'];
  });

  test('village, sifts top 3 cards for actions', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'WanderingMinstrel']);
    setDeck(player, ['Copper', 'Island', 'Silver', 'Village', 'Copper']);
    await waitForNextInput();
    respondWithCard('WanderingMinstrel');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Island');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
    expect(player.deck.length).toBe(3);
    expect(player.deck.last().title).toBe('Island');
    expect(player.discardPile.last().title).toBe('Silver');
  });
};
