import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithCards, respondWithSupply, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Procession', 'Ratcatcher', 'Pillage', 'Artisan'];
  });

  test('should play and action card twice', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Moneylender', 'Procession']);
    await waitForNextInput();
    respondWithCard('Procession');
    await waitForNextInput();
    respondWithCard('Moneylender');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('Pillage');
    await waitForNextInput();
    expect(player.hand.length).toBe(1);
    expect(player.actions).toBe(0);
    expect(player.money).toBe(6);
    expect(game.trash.length).toBe(3);
    expect(game.trash.last().title).toBe('Moneylender');
    expect(player.discardPile.last().title).toBe('Pillage');
  });

  test('should be able to Procession a Procession', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Laboratory', 'Festival', 'Procession', 'Procession']);
    await waitForNextInput();
    respondWithCard('Procession');
    await waitForNextInput();
    respondWithCard('Procession');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(0);
    respondWithCard('Festival');
    await waitForNextInput();
    expect(player.hand.length).toBe(2);
    expect(player.actions).toBe(4);
    expect(player.buys).toBe(3);
    expect(player.money).toBe(4);
    expect(game.trash.last().title).toBe('Festival');
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Gold');
    respondWithCard('Laboratory');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(6);
    expect(player.buys).toBe(3);
    expect(player.money).toBe(4);
    expect(game.trash.last().title).toBe('Laboratory');
    respondWithSupply('Artisan');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Artisan');
    respondWithSupply('Duchy');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Procession');
    expect(player.discardPile.last().title).toBe('Duchy');
  });

  test('should work on cards that trash themselves', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Pillage', 'Procession']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Procession');
    await waitForNextInput();
    respondWithCard('Pillage');
    await waitForNextInput();
    respondWithSupply('Gold');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Pillage');
    expect(player.discardPile.last().title).toBe('Gold');
    expect(game.trash.length).toBe(1);
    expect(player.discardPile.length).toBe(5); // 4 spoils and a gold
    expect(player.playArea.length).toBe(1);
  });

  test('should work on reserve cards', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Silver', 'Ratcatcher', 'Procession']);
    await waitForNextInput();
    respondWithCard('Procession');
    await waitForNextInput();
    respondWithCard('Ratcatcher');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(game.trash.length).toBe(0);
    expect(player.discardPile.last().title).toBe('Silver');
    expect(player.hand.length).toBe(5);
    expect(player.actions).toBe(2);
    expect(player.mats.tavern.length).toBe(1);
  });
};
