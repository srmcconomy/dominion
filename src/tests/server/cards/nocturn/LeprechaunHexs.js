import BadOmens from 'cards/nocturn/BadOmens';
import Delusion from 'cards/nocturn/Delusion';
import Envy from 'cards/nocturn/Envy';
import Famine from 'cards/nocturn/Famine';
import Fear from 'cards/nocturn/Fear';
import Greed from 'cards/nocturn/Greed';
import Haunting from 'cards/nocturn/Haunting';
import Locusts from 'cards/nocturn/Locusts';
import Misery from 'cards/nocturn/Misery';
import Plague from 'cards/nocturn/Plague';
import Poverty from 'cards/nocturn/Poverty';
import War from 'cards/nocturn/War';
import { test, beforeEach, expect, log } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, respondWithCards, skipToNextTurn, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Leprechaun'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Leprechaun']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Doom');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(3);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('Hex Pile is created', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexPile.some(c => c.title === 'BadOmens')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'Delusion')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'Envy')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'Famine')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'Fear')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'Greed')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'Haunting')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'Locusts')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'Misery')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'Plague')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'Poverty')).toBe(true);
    expect(game.hexPile.some(c => c.title === 'War')).toBe(true);
  });

  test('Bad Omens should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new BadOmens(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    respondWithCards(['Copper', 'Copper']);
    await waitForNextInput();
    expect(player.discardPile.length).toBe(4);
    expect(player.deck.length).toBe(2);
    expect(player.deck.filter(c => c.title === 'Copper').length).toBe(2);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('Delusion should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Delusion(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.states.some(s => s.title === 'Deluded')).toBe(true);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('Deluded should prevent buying of Action cards');

  test('Envy should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Envy(game));
    setHand(player, ['Silver', 'Gold', 'Copper', 'Copper', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.states.some(s => s.title === 'Envious')).toBe(true);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);

    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.money).toBe(1);
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.money).toBe(2);
  });

  test('Famine should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Famine(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    setDeck(player, ['Copper', 'Village', 'Silver']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Village');
    expect(player.deck.length).toBe(2);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('Fear should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Fear(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Copper');
    expect(player.hand.length).toBe(4);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('Greed should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Greed(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    setDeck(player, ['Silver']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.deck.length).toBe(2);
    expect(player.deck.last().title).toBe('Copper');
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('Haunting should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Haunting(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    setDeck(player, ['Silver']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    expect(player.deck.length).toBe(2);
    expect(player.deck.last().title).toBe('Copper');
    expect(player.hand.length).toBe(3);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('Locusts should work with Copper', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Locusts(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    setDeck(player, ['Copper']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Curse');
    expect(game.trash.last().title).toBe('Copper');
    expect(player.deck.length).toBe(0);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('Locusts should work with Duchy', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Locusts(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    setDeck(player, ['Duchy']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    respondWithSupply('Estate');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Estate');
    expect(game.trash.last().title).toBe('Duchy');
    expect(player.deck.length).toBe(0);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('Locusts should work with Harem', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Locusts(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    setDeck(player, ['Harem']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Silver');
    expect(game.trash.last().title).toBe('Harem');
    expect(player.deck.length).toBe(0);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('Misery should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Misery(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    setDeck(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.states.some(s => s.title === 'Miserable')).toBe(true);
    expect(player.states.some(s => s.title === 'TwiceMiserable')).toBe(false);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);

    await skipToNextTurn(player);
    game.hexPile.push(new Misery(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.states.some(s => s.title === 'Miserable')).toBe(false);
    expect(player.states.some(s => s.title === 'TwiceMiserable')).toBe(true);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(2);

    game.endOfGame();
    expect(player.score).toBe(-4);
  });

  test('Plague should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Plague(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.hand.last().title).toBe('Curse');
    expect(player.hand.length).toBe(5);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('Poverty should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new Poverty(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    respondWithCards(['Copper']);
    await waitForNextInput();
    expect(player.hand.length).toBe(3);
    expect(player.discardPile.length).toBe(2); // Also the Gold
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('War should work', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    game.hexPile.push(new War(game));
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    setDeck(player, ['Estate', 'Silver', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Silver');
    expect(player.deck.length).toBe(1);
    expect(player.discardPile.length).toBe(3);
    expect(game.hexPile.length).toBe(12);
    expect(game.hexDiscardPile.length).toBe(1);
  });

  test('should hex', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.hexsReceivedThisTurn.length).toBe(1);
  });

  test('should give wish when condition met', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Village', 'Village', 'Village', 'Village', 'Village', 'Village', 'Leprechaun']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Leprechaun');
    await waitForNextInput();
    expect(player.discardPile.some(c => c.title === 'Gold')).toBe(true);
    expect(player.discardPile.last().title).toBe('Wish');
  });

  test('should add wish supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Wish').cards.length).toBe(12);
  });
};
