import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithNoCards, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Guardian'];
  });

  test('should give money next turn', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Silver']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('Guardian');
    await waitForNextInput();
    respondWithCard('Guardian');
    await waitForNextInput();

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(1);
    expect(player.money).toBe(1);

    await skipToNextTurn(player);
    await waitForNextInput();
    expect(player.playArea.length).toBe(0);
    expect(player.money).toBe(0);
  });

  test('should block attacks', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Guardian']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Guardian');

    await skipToNextTurn(otherPlayer);
    setHand(otherPlayer, ['Silver', 'Militia']);
    await waitForNextInput();
    respondWithCard('Militia');
    await waitForNextInput();
    respondWithCard('Silver');
    expect(player.hand.length).toBe(5);
  });

  test('shouldn\'t conflit with moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Guardian']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Silver', 'Militia']);
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Guardian');

    await skipToNextTurn(otherPlayer);
    setHand(otherPlayer, ['Silver', 'Militia']);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Militia'); // other attacks with militia
    await waitForNextInput();
    respondWithCard('Guardian');  // player chooses Guardian to block the attack
    await waitForNextInput();
    respondWithNoCards(); // player declines option to also show Moat
    await waitForNextInput();
    respondWithCard('Silver');  // other continues with buy phase
    expect(player.hand.length).toBe(5);
    expect(otherPlayer.money).toBe(2);
  });
};
