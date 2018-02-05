import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Swindler', 'Village'];
  });

  test('should attack', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Swindler']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Silver']);
    await waitForNextInput();
    respondWithCard('Swindler');
    await waitForNextInput();
    respondWithSupply('Village');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(otherPlayer.deck.length).toBe(4);
    expect(otherPlayer.discardPile.last().title).toBe('Village');
    expect(game.trash.length).toBe(1);
  });

  test('works on potion cost cards');

  test('works on debt cost cards');

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Swindler']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Swindler');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.deck.length).toBe(5);
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.money).toBe(3);
  });
};
