import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithSupply, respondWithCard, respondWithNoCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['DeathCart'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['DeathCart']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Looter');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(4);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should trash action from hand', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Village', 'DeathCart']);
    await waitForNextInput();
    respondWithCard('DeathCart');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(5);
    expect(game.trash.last().title).toBe('Village');
  });

  test('should be able to trash self', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Village', 'DeathCart']);
    await waitForNextInput();
    respondWithCard('DeathCart');
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    expect(player.hand.length).toBe(4);
    expect(player.playArea.length).toBe(0);
    expect(player.actions).toBe(0);
    expect(player.buys).toBe(1);
    expect(player.money).toBe(5);
    expect(game.trash.last().title).toBe('DeathCart');
  });


  test('should gain ruins when purchased', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Silver', 'Silver']);
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    respondWithSupply('DeathCart');
    await waitForNextInput();
    expect(player.discardPile.filter(c => c.title === 'DeathCart').length).toBe(1);
    expect(player.discardPile.filter(c => c.types.has('Ruins')).length).toBe(2);
    expect(game.supplies.get('Ruins').cards.length).toBe(8);
  });

  test('should gain ruins when gained otherways', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Armory']);
    await waitForNextInput();
    respondWithCard('Armory');
    await waitForNextInput();
    respondWithSupply('DeathCart');
    await waitForNextInput();
    expect(player.deck.last().title).toBe('DeathCart');
    expect(player.discardPile.filter(c => c.types.has('Ruins')).length).toBe(2);
    expect(game.supplies.get('Ruins').cards.length).toBe(8);
  });

  test('should create Ruins Supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Ruins').cards.length).toBe(10);
  });
};
