import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, skipToNextTurn, respondWithSupply, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['BlessedVillage'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['BlessedVillage']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Fate');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Boon Pile is created and WillOWisp', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('WillOWisp').cards.length).toBe(12);
    expect(game.boonPile.length).toBe(12);
  });

  test('should be a village', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'BlessedVillage']);
    await waitForNextInput();
    respondWithCard('BlessedVillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
  });

  test('should receive a boon', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Workshop']);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('BlessedVillage');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.boonsReceivedThisTurn.length).toBe(1);
  });

  test('should receive a boon next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Festival', 'Silver', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Festival');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('BlessedVillage');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.discardPile.last().boons.length).toBe(1);

    await skipToNextTurn(player);
    await waitForNextInput();

    await skipToNextTurn(otherPlayer);
    await waitForNextInput();
    expect(player.boonsReceivedThisTurn.length).toBe(1);
  });
};
