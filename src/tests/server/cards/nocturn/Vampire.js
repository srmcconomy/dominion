import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithNoCards, respondWithSupply, respondWithCards, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Vampire'];
  });

  test('Vampire should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Vampire']);
    const card = player.hand.last();
    expect(card.types).toHave('Night');
    expect(card.types).toHave('Attack');
    expect(card.types).toHave('Doom');
    expect(card.types.size).toBe(3);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Bat should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Bat']);
    const card = player.hand.last();
    expect(card.types).toHave('Night');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(2);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Bat Pile is created', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Bat').cards.length).toBe(10);
  });

  test('hex, gain, and exchange', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(player, ['Vampire', 'Vampire']);
    setHand(otherPlayer, []);
    setDeck(otherPlayer, []);
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Vampire');
    await waitForNextInput();
    expect(otherPlayer.hexsReceivedThisTurn.length).toBe(1);
    expect(game.hexPile.length).toBe(11);
    expect(game.hexDiscardPile.length).toBe(1);

    respondWithSupply('Duchy');
    await waitForNextInput();
    expect(player.discardPile.some(c => c.title === 'Duchy')).toBe(true);
    expect(player.discardPile.some(c => c.title === 'Bat')).toBe(true);
    expect(game.supplies.get('Vampire').cards.length).toBe(11);
    expect(player.cardsOwned.some(c => c.title === 'Bat')).toBe(true);
    expect(player.cardsOwned.filter(c => c.title === 'Vampire').length).toBe(1);
  });

  test('bat should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Estate', 'Estate', 'Bat', 'Bat']);
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Bat');
    await waitForNextInput();

    respondWithCards(['Estate', 'Estate']);
    await waitForNextInput();
    expect(game.trash.length).toBe(2);
    expect(player.discardPile.last().title).toBe('Vampire');
    expect(game.supplies.get('Bat').cards.length).toBe(11);
    expect(game.supplies.get('Vampire').cards.length).toBe(9);
    expect(player.cardsOwned.some(c => c.title === 'Vampire')).toBe(true);
    expect(player.cardsOwned.filter(c => c.title === 'Bat').length).toBe(1);
  });

  test('bat should work even with fortresses', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Fortress', 'Fortress', 'Bat', 'Bat']);
    await waitForNextInput();
    respondWithNoCards();
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('Bat');
    await waitForNextInput();
    respondWithCards(['Fortress', 'Fortress']);
    await waitForNextInput();
    respondWithCard('Fortress');
    await waitForNextInput();
    expect(game.trash.length).toBe(0);
    expect(player.discardPile.last().title).toBe('Vampire');
    expect(game.supplies.get('Bat').cards.length).toBe(11);
    expect(game.supplies.get('Vampire').cards.length).toBe(9);
  });
};
