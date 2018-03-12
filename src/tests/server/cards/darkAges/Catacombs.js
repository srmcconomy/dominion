import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, respondWithCards, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Catacombs'];
  });

  test('should be able to draw top 3', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Catacombs']);
    setDeck(player, ['Silver', 'Silver', 'Silver', 'Gold', 'Gold', 'Gold']);
    await waitForNextInput();
    respondWithCard('Catacombs');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Gold').length).toBe(3);
    expect(player.discardPile.length).toBe(0);
  });

  test('should be able to discard and draw next 3', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Catacombs']);
    setDeck(player, ['Silver', 'Silver', 'Silver', 'Gold', 'Gold', 'Gold']);
    await waitForNextInput();
    respondWithCard('Catacombs');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Silver').length).toBe(3);
    expect(player.discardPile.length).toBe(3);
  });

  test('should gain cheaper card on trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'Catacombs']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['Catacombs']);
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Silver');
    expect(game.trash.last().title).toBe('Catacombs');
  });
};
