import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithCards, respondWithNoCards, respondWithSupply, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Tournament'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Tournament']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should cantrip if opponent doesn\'t have Province', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Tournament']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Tournament');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
  });

  test('should cantrip if opponent doesn\'t reveal Province', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Tournament']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Province']);
    await waitForNextInput();
    respondWithCard('Tournament');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
  });

  test('should allow for gain of duchy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Province', 'Tournament']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Tournament');
    await waitForNextInput();
    respondWithCard('Province');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
    expect(player.discardPile.last().title).toBe('Duchy');
    expect(game.supplies.get('Duchy').cards.length).toBe(7);
  });

  test('should allow for gain of prize', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Province', 'Tournament']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Tournament');
    await waitForNextInput();
    respondWithCard('Province');
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('BagOfGold');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(1);
    expect(player.discardPile.last().title).toBe('BagOfGold');
    expect(game.supplies.get('Prizes').cards.length).toBe(4);
  });

  test('Bag Of Gold works', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'BagOfGold']);
    await waitForNextInput();
    respondWithCard('BagOfGold');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('Gold');
    expect(player.actions).toBe(1);
  });

  test('Diadem works', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Village', 'Diadem']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Diadem');
    await waitForNextInput();
    expect(player.money).toBe(4);
  });

  test('Followers works', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Followers']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Followers');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.discardPile.last().title).toBe('Estate');
    expect(otherPlayer.hand.length).toBe(3);
    expect(otherPlayer.discardPile.some(c => c.title === 'Curse')).toBe(true);
  });

  test('Followers should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Followers']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('Followers');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.hand.length).toBe(5);
  });

  test('Princess works', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Gold', 'Princess']);
    await waitForNextInput();
    respondWithCard('Princess');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    respondWithSupply('Duchy');
    await waitForNextInput();
    expect(player.discardPile.some(c => c.title === 'Estate')).toBe(true);
    expect(player.discardPile.some(c => c.title === 'Duchy')).toBe(true);
  });

  test('Trusty Steed works', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'TrustySteed']);
    await waitForNextInput();
    respondWithCard('TrustySteed');
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    respondWithChoice(1);
    await waitForNextInput();
    expect(player.actions).toBe(2);
    expect(player.money).toBe(2);
  });

  test('Trusty Steed Draws before Gaining', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'TrustySteed']);
    await waitForNextInput();
    respondWithCard('TrustySteed');
    await waitForNextInput();
    respondWithChoice(3);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.hand.some(c => c.title === 'Silver')).toBe(false);
    expect(player.discardPile.length).toBe(7);
  });
};
