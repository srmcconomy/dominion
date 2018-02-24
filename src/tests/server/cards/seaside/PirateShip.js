import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['PirateShip'];
  });

  test('should trash only treasure', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'PirateShip']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Estate', 'Estate', 'Estate', 'Estate', 'Copper']);
    await waitForNextInput();
    respondWithCard('PirateShip');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.mats.pirateShip).toBe(1);
    expect(game.trash.length).toBe(1);
  });

  test('should allow choice of treasure', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'PirateShip']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Estate', 'Estate', 'Estate', 'Silver', 'Copper']);
    await waitForNextInput();
    respondWithCard('PirateShip');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.mats.pirateShip).toBe(1);
    expect(game.trash.length).toBe(1);
    expect(game.trash.last().title).toBe('Silver');
  });

  test('should stack', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Village', 'PirateShip', 'PirateShip']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Estate', 'Gold', 'Estate', 'Silver', 'Copper']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('PirateShip');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('PirateShip');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.mats.pirateShip).toBe(2);
    expect(game.trash.length).toBe(2);
    expect(game.trash.last().title).toBe('Gold');
  });

  test('should give coin', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'PirateShip']);
    player.mats.pirateShip = 4;
    await waitForNextInput();
    respondWithCard('PirateShip');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.money).toBe(4);
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'PirateShip']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('PirateShip');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.deck.length).toBe(5);
    expect(game.trash.length).toBe(0);
  });
};
