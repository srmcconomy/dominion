import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Doctor'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Doctor']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should name card and trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Doctor']);
    setDeck(player, ['Copper', 'Copper', 'Estate', 'Copper', 'Estate']);
    await waitForNextInput();
    respondWithCard('Doctor');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(0);
    expect(player.discardPile.length).toBe(0);
    expect(game.trash.filter(c => c.title === 'Estate').length).toBe(2);
  });

  test('overpay should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Festival', 'Gold', 'Silver', 'Silver', 'Estate']);
    setDeck(player, ['Copper', 'Copper', 'Curse', 'Duchy', 'Estate']);
    await waitForNextInput();
    respondWithCard('Festival');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Doctor');
    await waitForNextInput();
    respondWithChoice(0); // Overpay 1
    await waitForNextInput();
    respondWithChoice(0); // Overpay 2
    await waitForNextInput();
    respondWithChoice(0); // Overpay 3
    await waitForNextInput();
    respondWithChoice(1); // Done Overpay
    await waitForNextInput();
    respondWithChoice(0); // Trash Estate
    await waitForNextInput();
    respondWithChoice(1); // Discard Duchy
    await waitForNextInput();
    respondWithChoice(2); // Put back Curse
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Estate');
    expect(player.discardPile.filter(c => c.title === 'Doctor').length).toBe(1);
    expect(player.discardPile.filter(c => c.title === 'Duchy').length).toBe(1);
    expect(player.deck.last().title).toBe('Curse');
  });
};
