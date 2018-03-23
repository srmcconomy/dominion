import Idol from 'cards/nocturn/Idol';
import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Idol'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Idol']);
    const card = player.hand.last();
    expect(card.types).toHave('Treasure');
    expect(card.types).toHave('Attack');
    expect(card.types).toHave('Fate');
    expect(card.types.size).toBe(3);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should give boon', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Idol']);
    await waitForNextInput();
    respondWithCard('Idol');
    await waitForNextInput();
    expect(player.money >= 2).toBe(true);
    expect(player.boonsReceivedThisTurn.length).toBe(1);
  });

  test('should give out curses', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    player.playArea.push(new Idol(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Idol']);
    await waitForNextInput();
    respondWithCard('Idol');
    await waitForNextInput();
    expect(player.money).toBe(2);
    expect(otherPlayer.discardPile.last().title).toBe('Curse');
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    player.playArea.push(new Idol(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Idol']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Idol');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.discardPile.length).toBe(0);
  });
};
