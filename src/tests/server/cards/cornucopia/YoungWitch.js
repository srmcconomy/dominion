import YoungWitch from 'cards/cornucopia/YoungWitch';
import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['YoungWitch'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['YoungWitch']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Attack');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should curse', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'YoungWitch']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    await waitForNextInput();
    respondWithCard('YoungWitch');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(otherPlayer.discardPile.last().title).toBe('Curse');
    expect(game.supplies.get(YoungWitch.bane.title).cost.coin <= 3).toBe(true);
  });

  test('should be blocked by bane', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'YoungWitch']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', YoungWitch.bane.title]);
    await waitForNextInput();
    respondWithCard('YoungWitch');
    await waitForNextInput();
    if (otherPlayer.hand.some(c => c.types.has('Reaction'))) {
      respondWithNoCards();
      await waitForNextInput();
    }
    respondWithCards(['Copper', 'Copper']);

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard(YoungWitch.bane.title);

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.hand.length).toBe(5);
  });

  test('a spilt pile bane should work for all cards in the pile');

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'YoungWitch']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('YoungWitch');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.hand.length).toBe(5);
  });
};
