import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, respondWithFirstCard, setStartingDeck, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Magpie'];
  });

  test('should give 1 card and 1 action', async () => {
    setStartingDeck([...Array(10)].map(() => 'Curse'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Magpie']);
    await waitForNextInput();
    respondWithCard('Magpie');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
  });

  test('should draw the top card if it is a Treasure', async () => {
    setStartingDeck([...Array(10)].map(() => 'Silver'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Magpie']);
    await waitForNextInput();
    respondWithCard('Magpie');
    await waitForNextInput();

    expect(player.hand.length).toBe(6);
    const numSilvers = player.hand.filter(c => c.title === 'Silver').length;
    expect(numSilvers).toBe(2);
  });

  test('should gain a Magpie if the top card is a Victory card', async () => {
    setStartingDeck([...Array(10)].map(() => 'Estate'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Magpie']);
    await waitForNextInput();
    respondWithCard('Magpie');
    await waitForNextInput();

    expect(player.hand.length).toBe(5);
    expect(player.cardsGainedThisTurn[0].title).toBe('Magpie');
  });

  test('should gain a Magpie if the top card is an Action card', async () => {
    setStartingDeck([...Array(10)].map(() => 'Magpie'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Magpie']);
    await waitForNextInput();
    respondWithCard('Magpie');
    await waitForNextInput();

    expect(player.hand.length).toBe(5);
    expect(player.cardsGainedThisTurn[0].title).toBe('Magpie');
  });

  test('should gain a Magpie and draw the top card it is a Treasure and a Victory card', async () => {
    setStartingDeck([...Array(10)].map(() => 'Harem'));
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Magpie']);
    await waitForNextInput();
    respondWithCard('Magpie');
    await waitForNextInput();

    expect(player.hand.length).toBe(6);
    const numHarems = player.hand.filter(c => c.title === 'Harem').length;
    expect(numHarems).toBe(2);
    expect(player.cardsGainedThisTurn[0].title).toBe('Magpie');
  });
};
