import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithCard, respondWithCards, respondWithSupply, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Herald'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Herald']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('cantrip then play top card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Herald']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'Copper']);
    await waitForNextInput();
    respondWithCard('Herald');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);

    respondWithCards(['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(player.playArea.length).toBe(2);
    expect(game.trash.length).toBe(4);
  });

  test('overpay should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Gold', 'Festival', 'Silver', 'Estate']);
    setDiscardPile(player, ['Village', 'Copper', 'Duchy', 'Province', 'Copper']);
    await waitForNextInput();
    respondWithCard('Festival');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Herald');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'Herald').length).toBe(0);
    respondWithCard('Duchy');
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'Duchy').length).toBe(0);
    expect(player.deck.last().title).toBe('Duchy');
    respondWithCard('Province');
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'Province').length).toBe(0);
    expect(player.deck.last().title).toBe('Province');
    respondWithCard('Village');
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'Village').length).toBe(0);
    expect(player.deck.last().title).toBe('Village');
  });
};
