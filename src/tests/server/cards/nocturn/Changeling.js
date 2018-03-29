import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithFirstCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Changeling', 'GhostTown'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Changeling']);
    const card = player.hand.last();
    expect(card.types).toHave('Night');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should gain stuff in play', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold', 'Changeling', 'Changeling']);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Changeling');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Changeling');
    expect(player.discardPile.last().title).toBe('Gold');
    expect(player.playArea.length).toBe(1);
  });

  test('should exchange for a Changeling', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold', 'Monastery']);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Changeling');
    expect(game.supplies.get('Changeling').cards.length).toBe(9);
    expect(game.supplies.get('Silver').cards.length).toBe(40);
  });

  test('should exchange to hand if card was gained to hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold', 'Monastery']);
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithSupply('GhostTown');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.hand.last().title).toBe('Changeling');
    expect(game.supplies.get('Changeling').cards.length).toBe(9);
    expect(game.supplies.get('GhostTown').cards.length).toBe(10);
  });
};
