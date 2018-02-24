import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Outpost'];
  });

  test('should give extra turn with three cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Outpost']);
    setDeck(player, ['Estate', 'Estate', 'Gold', 'Silver', 'Festival']);
    await waitForNextInput();
    respondWithCard('Outpost');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);

    respondWithCard('Festival');
    await waitForNextInput();
    expect(player.playArea.length).toBe(2);
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(1);
    expect(player.money).toBe(5);
  });

  test('second played on a turn doesn\'t stay out or work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Outpost', 'Festival', 'Outpost']);
    setDeck(player, ['Estate', 'Silver', 'Gold', 'Estate', 'Festival']);
    await waitForNextInput();
    respondWithCard('Festival');
    await waitForNextInput();
    respondWithCard('Outpost');
    await waitForNextInput();
    respondWithCard('Outpost');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);

    respondWithCard('Festival');
    await waitForNextInput();
    expect(player.playArea.length).toBe(2);
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(1);
    expect(player.money).toBe(5);
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();

    expect(game.currentPlayer).toNotBe(player);
  });
};
