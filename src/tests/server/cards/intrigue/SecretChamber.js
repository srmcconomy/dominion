import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['SecretChamber'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['SecretChamber']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Reaction');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give money for discard', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SecretChamber']);
    await waitForNextInput();
    respondWithCard('SecretChamber');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(1);
    expect(player.money).toBe(3);
  });

  test('should react', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Militia']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Silver', 'Copper', 'Copper', 'SecretChamber']);
    await waitForNextInput();
    respondWithCard('Militia');
    await waitForNextInput();
    respondWithCard('SecretChamber');
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(7);
    respondWithCard('Copper');
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(6);
    expect(otherPlayer.deck.last().title).toBe('Copper');
    respondWithCard('Silver');
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(5);
    expect(otherPlayer.deck.last().title).toBe('Silver');
  });
};