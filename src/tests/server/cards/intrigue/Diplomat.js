import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Diplomat'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Diplomat']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Reaction');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should only draw with 5 card in cand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Diplomat']);
    await waitForNextInput();
    respondWithCard('Diplomat');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(0);
  });

  test('should draw and give actions if less cards in hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Lurker', 'Diplomat']);
    await waitForNextInput();
    respondWithCard('Lurker');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Diplomat');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
  });

  test('should react to attacks', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Militia']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Diplomat']);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Estate', 'Estate']);
    await waitForNextInput();
    respondWithCard('Militia');
    await waitForNextInput();
    respondWithCard('Diplomat');
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(7);
    respondWithCards(['Estate', 'Estate', 'Copper']);
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(4);
    respondWithCards(['Copper']);
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(3);
    expect(player.money).toBe(2);
  });
};
