import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Ghost'];
  });

  test('should have 6 in supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Ghost').cards.length).toBe(6);
  });

  test('shouldn\'t stay out if didn\'t find anything', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Ghost']);
    setDeck(player, ['Copper']);
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Ghost');
    await waitForNextInput();

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
  });

  test('should play found card twice', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Estate', 'Estate', 'Estate', 'Estate', 'Ghost']);
    setDeck(player, ['Village', 'Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Ghost');
    await waitForNextInput();
    expect(player.playArea.last().setAside.last().title).toBe('Village');

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(2);
    expect(player.hand.length).toBe(7);
    expect(player.actions).toBe(5);
  });

  test('should play durations properly', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Estate', 'Estate', 'Estate', 'Estate', 'Ghost']);
    setDeck(player, ['MerchantShip', 'Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Ghost');
    await waitForNextInput();
    expect(player.playArea.last().setAside.last().title).toBe('MerchantShip');

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(2);
    expect(player.money).toBe(4);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(2);
    expect(player.money).toBe(4);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
    expect(player.money).toBe(0);
  });
};
