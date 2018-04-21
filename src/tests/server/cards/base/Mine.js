import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithSupply, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Mine'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Mine']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types.size).toBe(1);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should upgrade Copper to Silver', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mine']);
    await waitForNextInput();
    respondWithCard('Mine');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Silver').length).toBe(1);
    expect(game.trash.length).toBe(1);
  });

  test('shouldn\'t upgrade Copper to Gold', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Mine']);
    await waitForNextInput();
    respondWithCard('Mine');
    await waitForNextInput();
    respondWithCard('Copper');
    await waitForNextInput();
    respondWithSupply('Gold');
    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(lastInputWasValid).toBe(false);
    expect(game.trash.length).toBe(1);
    respondWithSupply('Copper');
    await waitForNextInput();
    expect(player.hand.filter(c => c.title === 'Copper').length).toBe(4);
  });
};
