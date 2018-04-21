import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Tormentor'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Tormentor']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Attack');
    expect(card.types).toHave('Doom');
    expect(card.types.size).toBe(3);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Imp Pile is created', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Imp').cards.length).toBe(13);
  });

  test('should money and imp', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Tormentor']);
    await waitForNextInput();
    respondWithCard('Tormentor');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Imp');
    expect(player.money).toBe(2);
    expect(otherPlayer.hexsReceivedThisTurn.length).toBe(0);
  });

  test('should hex', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Village', 'Tormentor']);
    setHand(otherPlayer, []);
    setDeck(otherPlayer, []);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Tormentor');
    await waitForNextInput();
    expect(player.discardPile.length).toBe(0);
    expect(player.money).toBe(2);
    expect(otherPlayer.hexsReceivedThisTurn.length).toBe(1);
    expect(game.hexPile.length).toBe(11);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('should be blocked by moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Village', 'Tormentor']);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Tormentor');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(player.discardPile.length).toBe(0);
    expect(player.money).toBe(2);
    expect(otherPlayer.hexsReceivedThisTurn.length).toBe(0);
    expect(game.hexPile.length).toBe(11);
    expect(game.hexDiscardPile.length).toBe(1);
  });
};
