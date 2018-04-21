import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithChoice, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Graverobber'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Graverobber']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('both options should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Workshop', 'Village', 'Graverobber', 'Graverobber']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Graverobber');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(game.trash.last().title).toBe('Workshop');
    expect(player.discardPile.last().title).toBe('Gold');
    respondWithCard('Graverobber');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('Workshop');
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(player.deck.last().title).toBe('Workshop');
    expect(game.trash.length).toBe(0);
  });
};
