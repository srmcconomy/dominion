import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Lighthouse'];
  });

  test('should give money now and later', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Lighthouse']);
    await waitForNextInput();
    respondWithCard('Lighthouse');
    await waitForNextInput();
    expect(player.money).toBe(1);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.money).toBe(1);
  });

  test('should block attacks', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Lighthouse']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Silver', 'Militia']);
    await waitForNextInput();
    respondWithCard('Lighthouse');
    await waitForNextInput();
    expect(player.money).toBe(1);

    await skipToNextTurn(otherPlayer);
    await waitForNextInput();
    respondWithCard('Militia');
    await waitForNextInput();
    respondWithCard('Silver');
    expect(player.hand.length).toBe(5);
  });

  test('shouldn\'t conflit with moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Lighthouse']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Silver', 'Militia']);
    await waitForNextInput();
    respondWithCard('Lighthouse');
    await waitForNextInput();
    expect(player.money).toBe(1);

    await skipToNextTurn(otherPlayer);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Militia'); // other attacks with militia
    await waitForNextInput();
    respondWithCard('Lighthouse');  // player chooses Lighthouse to block the attack
    await waitForNextInput();
    respondWithNoCards(); // player declines option to also show Moat
    await waitForNextInput();
    respondWithCard('Silver');  // other continues with buy phase
    expect(player.hand.length).toBe(5);
  });
};
