import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Lurker', 'Market'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Lurker']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should be able to trash and gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Lurker', 'Lurker']);
    await waitForNextInput();
    respondWithCard('Lurker');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithSupply('Market');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(game.trash.last().title).toBe('Market');
    expect(game.supplies.get('Market').cards.length).toBe(9);
    respondWithCard('Lurker');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Market');
    await waitForNextInput();
    expect(game.trash.length).toBe(0);
    expect(player.discardPile.last().title).toBe('Market');
  });

  test('doesn\'t fail with empty trash', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Lurker']);
    await waitForNextInput();
    respondWithCard('Lurker');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.actions).toBe(1);
    expect(game.trash.length).toBe(0);
    expect(player.money).toBe(1);
  });
};
