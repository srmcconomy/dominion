import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setDiscardPile, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['FortuneTeller'];
  });

  test('should top deck Victory cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FortuneTeller']);
    setDeck(otherPlayer, ['Copper', 'Island', 'Copper']);
    await waitForNextInput();
    respondWithCard('FortuneTeller');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(otherPlayer.deck.last().title).toBe('Island');
    expect(otherPlayer.discardPile.length).toBe(1);
  });

  test('should top deck curses', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FortuneTeller']);
    setDeck(otherPlayer, ['Copper', 'Curse', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('FortuneTeller');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(otherPlayer.deck.last().title).toBe('Curse');
    expect(otherPlayer.discardPile.length).toBe(2);
  });

  test('should top deck from discardPile', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FortuneTeller']);
    setDeck(otherPlayer, ['Copper', 'Copper']);
    setDiscardPile(otherPlayer, ['Province']);
    await waitForNextInput();
    respondWithCard('FortuneTeller');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(otherPlayer.deck.last().title).toBe('Province');
    expect(otherPlayer.discardPile.length).toBe(2);
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'FortuneTeller']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('FortuneTeller');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.hand.length).toBe(5);
  });
};
