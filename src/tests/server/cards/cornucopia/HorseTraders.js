import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['HorseTraders'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['HorseTraders']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Reaction');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should do Normal Stuff', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'HorseTraders']);
    await waitForNextInput();
    respondWithCard('HorseTraders');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(2);
    expect(player.money).toBe(3);
  });

  test('should respond to Attacks', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Militia']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'HorseTraders']);
    await waitForNextInput();
    respondWithCard('Militia');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('HorseTraders');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    respondWithCards(['Copper']);
    await waitForNextInput();

    expect(otherPlayer.hand.length).toBe(3);
    expect(otherPlayer.asidePile.length).toBe(1);

    await skipToNextTurn(otherPlayer);
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(5);
    expect(otherPlayer.hand.some(c => c.title === 'HorseTraders')).toBe(true);
    expect(otherPlayer.asidePile.length).toBe(0);
  });

  test('should be found at end of game', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Militia']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'HorseTraders']);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Gardens']);
    await waitForNextInput();
    respondWithCard('Militia');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('HorseTraders');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    respondWithCards(['Copper']);
    await waitForNextInput();

    expect(otherPlayer.hand.length).toBe(3);
    expect(otherPlayer.asidePile.length).toBe(1);
    game.endOfGame();
    expect(otherPlayer.score).toBe(1);
  });
};
