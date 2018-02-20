import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, respondWithSupply, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Knights'];
  });

  test('should create knights supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Knights').cards.length).toBe(10);
    expect(game.supplies.get('Knights').cards.some(c => c.title === 'DameAnna')).toBe(true);
    expect(game.supplies.get('Knights').cards.some(c => c.title === 'DameJosephine')).toBe(true);
    expect(game.supplies.get('Knights').cards.some(c => c.title === 'DameMolly')).toBe(true);
    expect(game.supplies.get('Knights').cards.some(c => c.title === 'DameNatalie')).toBe(true);
    expect(game.supplies.get('Knights').cards.some(c => c.title === 'DameSylvia')).toBe(true);
    expect(game.supplies.get('Knights').cards.some(c => c.title === 'SirBailey')).toBe(true);
    expect(game.supplies.get('Knights').cards.some(c => c.title === 'SirDestry')).toBe(true);
    expect(game.supplies.get('Knights').cards.some(c => c.title === 'SirMartin')).toBe(true);
    expect(game.supplies.get('Knights').cards.some(c => c.title === 'SirMichael')).toBe(true);
    expect(game.supplies.get('Knights').cards.some(c => c.title === 'SirVander')).toBe(true);
  });

  test('DameAnna should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DameAnna']);
    await waitForNextInput();
    respondWithCard('DameAnna');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(game.trash.length).toBe(2);
    expect(player.hand.length).toBe(2);
  });

  test('DameAnna trash should be optional', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DameAnna']);
    await waitForNextInput();
    respondWithCard('DameAnna');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(game.trash.length).toBe(0);
    expect(player.hand.length).toBe(4);
  });

  test('DameJosephine should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DameJosephine']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    game.endOfGame();
    expect(player.score).toBe(2);
  });

  test('DameMolly should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DameMolly']);
    await waitForNextInput();
    respondWithCard('DameMolly');
    await waitForNextInput();
    expect(player.actions).toBe(2);
  });

  test('DameNatalie should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DameNatalie']);
    await waitForNextInput();
    respondWithCard('DameNatalie');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Silver');
  });

  test('DameSylvia should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DameSylvia']);
    await waitForNextInput();
    respondWithCard('DameSylvia');
    await waitForNextInput();
    expect(player.money).toBe(2);
  });

  test('SirBailey should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SirBailey']);
    await waitForNextInput();
    respondWithCard('SirBailey');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
  });

  test('SirDestry should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SirDestry']);
    await waitForNextInput();
    respondWithCard('SirDestry');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
  });

  test('SirMartin should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SirMartin']);
    await waitForNextInput();
    respondWithCard('SirMartin');
    await waitForNextInput();
    expect(player.buys).toBe(3);
  });

  test('SirMichael should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'SirMichael']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('SirMichael');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(otherPlayer.hand.length).toBe(3);
    expect(otherPlayer.discardPile.length).toBe(2);
  });

  test('SirVander should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Chapel', 'SirVander']);
    await waitForNextInput();
    respondWithCard('Chapel');
    await waitForNextInput();
    respondWithCards(['SirVander']);
    await waitForNextInput();
    expect(game.trash.last().title).toBe('SirVander');
    expect(player.discardPile.last().title).toBe('Gold');
  });

  test('Knight attack should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DameJosephine']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Gold', 'Silver']);
    await waitForNextInput();
    respondWithCard('DameJosephine');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(otherPlayer.deck.length).toBe(3);
    expect(game.trash.last().title).toBe('Gold');
    expect(otherPlayer.discardPile.last().title).toBe('Silver');
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DameJosephine']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('DameJosephine');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.deck.length).toBe(5);
  });

  test('should trash self if hits other knight', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'DameJosephine']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'DameMolly', 'Silver']);
    await waitForNextInput();
    respondWithCard('DameJosephine');
    await waitForNextInput();
    respondWithCard('DameMolly');
    await waitForNextInput();
    expect(otherPlayer.deck.length).toBe(3);
    expect(player.playArea.length).toBe(0);
    expect(game.trash.filter(c => c.types.has('Knight')).length).toBe(2);
    expect(otherPlayer.discardPile.last().title).toBe('Silver');
  });

  test('works with throne room', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'ThroneRoom', 'DameJosephine']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Copper', 'SirMartin', 'Copper', 'DameMolly', 'Silver']);
    await waitForNextInput();
    respondWithCard('ThroneRoom');
    await waitForNextInput();
    respondWithCard('DameJosephine');
    await waitForNextInput();
    respondWithCard('DameMolly');
    await waitForNextInput();
    respondWithCard('SirMartin');
    await waitForNextInput();
    expect(otherPlayer.deck.length).toBe(1);
    expect(player.playArea.length).toBe(1);
    expect(game.trash.filter(c => c.types.has('Knight')).length).toBe(3);
    expect(otherPlayer.discardPile.last().title).toBe('Copper');
  });
};
