import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Raider'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Raider']);
    const card = player.hand.last();
    expect(card.types).toHave('Night');
    expect(card.types).toHave('Duration');
    expect(card.types).toHave('Attack');
    expect(card.types.size).toBe(3);
    expect(card.cost.coin).toBe(6);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give $3 next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Raider']);
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Raider');
    await waitForNextInput();

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.money).toBe(3);
    expect(player.hand.length).toBe(5);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
    expect(player.money).toBe(0);
    expect(player.hand.length).toBe(5);
  });

  test('should force discard of Copper', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Raider']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Raider');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(4);
    expect(otherPlayer.discardPile.last().title).toBe('Copper');
  });

  test('shouldn\'t discard if no matches in hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Silver', 'Raider', 'Raider']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Raider');
    await waitForNextInput();
    respondWithCard('Raider');
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(5);
    expect(otherPlayer.discardPile.length).toBe(0);
  });

  test('shouldn\'t discard if hand less than 5', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Raider', 'Raider']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Raider');
    await waitForNextInput();
    respondWithCard('Raider');
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(4);
    expect(otherPlayer.discardPile.length).toBe(0);
  });
};
