import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Amulet'];
  });

  test('should give the option of giving 1 coin', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Amulet']);
    await waitForNextInput();
    respondWithCard('Amulet');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();

    expect(player.money).toBe(1);
    expect(game.trash.length).toBe(0);
    expect(player.cardsGainedThisTurn.length).toBe(0);
  });

  test('should give the option of trashing a card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Amulet']);
    await waitForNextInput();
    respondWithCard('Amulet');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();

    expect(player.money).toBe(0);
    expect(game.trash.last().title).toBe('Copper');
    expect(player.cardsGainedThisTurn.length).toBe(0);
  });

  test('should give the option of gaining a Silver', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Amulet']);
    await waitForNextInput();
    respondWithCard('Amulet');
    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();

    expect(player.money).toBe(0);
    expect(game.trash.length).toBe(0);
    expect(player.cardsGainedThisTurn[0].title).toBe('Silver');
  });

  test('should trigger at the beginning of the next turn, with the option of giving 1 coin', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Amulet']);
    await waitForNextInput();
    respondWithCard('Amulet');
    await waitForNextInput();
    respondWithChoice(0);
    await skipToNextTurn(player);

    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();

    expect(player.money).toBe(1);
    expect(game.trash.length).toBe(0);
    expect(player.cardsGainedThisTurn.length).toBe(0);
  });

  test('should trigger at the beginning of the next turn, with the option of trashing a card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Amulet']);
    await waitForNextInput();
    respondWithCard('Amulet');
    await waitForNextInput();
    respondWithChoice(0);
    await skipToNextTurn(player);

    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();

    expect(player.money).toBe(0);
    expect(game.trash.last().title).toBe('Copper');
    expect(player.cardsGainedThisTurn.length).toBe(0);
  });

  test('should trigger at the beginning of the next turn, with the option of gaining a Silver', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Amulet']);
    await waitForNextInput();
    respondWithCard('Amulet');
    await waitForNextInput();
    respondWithChoice(0);
    await skipToNextTurn(player);

    await waitForNextInput();
    respondWithChoice(2);
    await waitForNextInput();

    expect(player.money).toBe(0);
    expect(game.trash.length).toBe(0);
    expect(player.cardsGainedThisTurn[0].title).toBe('Silver');
  });
};
