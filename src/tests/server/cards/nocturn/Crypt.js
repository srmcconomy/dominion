import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithChoice, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Crypt'];
  });

  test('should setAside Cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Crypt', 'Crypt']);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Crypt');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.money).toBe(3);
    expect(player.playArea.last().setAside[0].length).toBe(3);
  });

  test('should pickup stuff and stay out until pile is empty', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Silver', 'Gold', 'Crypt', 'Crypt']);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Crypt');
    await waitForNextInput();
    respondWithCards(['Copper', 'Silver', 'Gold']);
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.money).toBe(6);
    expect(player.playArea.last().setAside[0].length).toBe(3);

    await skipToNextTurn(player);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.playArea.last().setAside[0].length).toBe(2);
    expect(player.playArea.last().ignoreCleanUp).toBe(true);
    expect(player.hand.last().title).toBe('Copper');

    await skipToNextTurn(player);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.playArea.last().setAside[0].length).toBe(1);
    expect(player.playArea.last().ignoreCleanUp).toBe(true);
    expect(player.hand.last().title).toBe('Silver');

    await skipToNextTurn(player);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.playArea.last().setAside[0].length).toBe(0);
    expect(player.playArea.last().ignoreCleanUp).toBe(false);
    expect(player.hand.last().title).toBe('Gold');

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
  });

  test('If there is ever a Night TR need to make sure it works with this, it should');
};
