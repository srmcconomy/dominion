import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithNoCards, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['ScryingPool'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['ScryingPool']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Attack');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(1);
    expect(card.cost.debt).toBe(0);
  });

  test('should create Potion Supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Potion').cards.length).toBe(16);
  });

  test('draw until seeing a non-Action card', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['ScryingPool']);
    setDeck(player, ['Copper', 'Copper', 'Village', 'Village'])
    await waitForNextInput();
    respondWithCard('ScryingPool');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.deck.length).toBe(1);
    expect(player.actions).toBe(1);
  });

  test('can discard, and from opponent', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['ScryingPool']);
    setDeck(player, ['Copper', 'Copper', 'Village', 'Village'])
    await waitForNextInput();
    respondWithCard('ScryingPool');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(player.deck.length).toBe(1);
    expect(player.actions).toBe(1);
    expect(player.discardPile.length).toBe(1);
    expect(otherPlayer.discardPile.length).toBe(1);
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'ScryingPool']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('ScryingPool');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.hand.length).toBe(5);
    expect(otherPlayer.deck.length).toBe(5);

    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.deck.length).toBe(4);
    expect(player.actions).toBe(1);
  });
};
