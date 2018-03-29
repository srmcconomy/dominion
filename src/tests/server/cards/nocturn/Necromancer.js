import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, setTrash, respondWithCard, respondWithSupply, respondWithFirstCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Necromancer', 'Pillage', 'Ratcatcher'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Necromancer']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should add zombies to the supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.trash.some(c => c.title === 'ZombieApprentice')).toBe(true);
    expect(game.trash.some(c => c.title === 'ZombieMason')).toBe(true);
    expect(game.trash.some(c => c.title === 'ZombieSpy')).toBe(true);
  });

  test('should play Zombie Apprentice', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Village', 'Necromancer']);
    await waitForNextInput();
    respondWithCard('Necromancer');
    await waitForNextInput();
    respondWithCard('ZombieApprentice');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(player.actions).toBe(1);
    expect(player.playArea.length).toBe(1);
    expect(game.trash.length).toBe(4);
  });

  test('should play Zombie Mason', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Necromancer']);
    setDeck(player, ['Estate']);
    await waitForNextInput();
    respondWithCard('Necromancer');
    await waitForNextInput();
    respondWithCard('ZombieMason');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Estate');
    expect(player.discardPile.last().title).toBe('Silver');
    expect(player.deck.length).toBe(0);
    expect(player.playArea.length).toBe(1);
    expect(game.trash.length).toBe(4);
  });

  test('should play Zombie Spy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Necromancer', 'Necromancer']);
    setDeck(player, ['Estate', 'Gold', 'Copper']);
    await waitForNextInput();
    respondWithCard('Necromancer');
    await waitForNextInput();
    respondWithCard('ZombieSpy');
    await waitForNextInput();
    respondWithFirstCard();
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.discardPile.last().title).toBe('Gold');
    expect(player.deck.length).toBe(1);
    expect(player.playArea.length).toBe(1);
    expect(game.trash.length).toBe(3);
  });

  test('should work with Pillage', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Necromancer']);
    setHand(otherPlayer, []);
    setTrash(game, ['Pillage']);
    await waitForNextInput();
    respondWithCard('Necromancer');
    await waitForNextInput();
    respondWithCard('Pillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.actions).toBe(0);
    expect(player.discardPile.filter(c => c.title === 'Spoils').length).toBe(2);
    expect(player.playArea.length).toBe(1);
    expect(game.trash.length).toBe(1);
  });

  test('should work with reserve cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Necromancer']);
    setHand(otherPlayer, []);
    setTrash(game, ['Ratcatcher']);
    await waitForNextInput();
    respondWithCard('Necromancer');
    await waitForNextInput();
    respondWithCard('Ratcatcher');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.mats.tavern.length).toBe(0);
    expect(player.playArea.length).toBe(1);
    expect(game.trash.length).toBe(1);
  });

  test('should work with conspirator', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Necromancer']);
    setHand(otherPlayer, []);
    setTrash(game, ['Conspirator', 'Necromancer']);
    await waitForNextInput();
    respondWithCard('Necromancer');
    await waitForNextInput();
    respondWithCard('Necromancer');
    await waitForNextInput();
    respondWithCard('Conspirator');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(1);
    expect(player.money).toBe(2);
    expect(player.playArea.length).toBe(1);
    expect(game.trash.length).toBe(2);
  });

  test('should work with prince?');
};
