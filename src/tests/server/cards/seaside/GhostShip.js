import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['GhostShip'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['GhostShip']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Attack');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should force top decking', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'GhostShip']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Silver']);
    setDeck(otherPlayer, ['Estate', 'Estate', 'Estate', 'Estate', 'Estate']);
    await waitForNextInput();
    respondWithCard('GhostShip');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithCard('Silver');
    await waitForNextInput();
    expect(player.hand.length).toBe(6);
    expect(otherPlayer.hand.length).toBe(3);
    expect(otherPlayer.deck.last().title).toBe('Silver');
  });

  test('shouldn\'t force players with smaller hands', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Gold', 'GhostShip']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Silver']);
    setDeck(otherPlayer, ['Estate', 'Estate', 'Estate', 'Estate', 'Estate']);
    await waitForNextInput();
    respondWithCard('GhostShip');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(player.hand.length).toBe(5);
    expect(otherPlayer.hand.length).toBe(3);
    expect(otherPlayer.deck.last().title).toBe('Estate');
  });

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'GhostShip']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    await waitForNextInput();
    respondWithCard('GhostShip');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.hand.length).toBe(5);
  });
};
