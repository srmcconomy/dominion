import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';
import Monastery from '../../../../client/cards/nocturn/Monastery';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['NightWatchman'];
  });

  test('should inspect deck', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold', 'Monastery']);
    setDeck(player, ['Curse', 'Province', 'Duchy', 'Estate', 'Silver', 'Copper']);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithSupply('NightWatchman');
    await waitForNextInput();
    respondWithCard('NightWatchman');
    await waitForNextInput();
    respondWithCards(['Province', 'Duchy']);
    await waitForNextInput();
    expect(player.discardPile.length).toBe(2);
    respondWithCard('Estate');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Estate');
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Silver');
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Copper');

    await skipToNextTurn(player);
    await waitForNextInput();
  });
};
