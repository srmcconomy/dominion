import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, respondWithCard, respondWithSupply, respondWithChoice, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['DevilsWorkshop'];
  });

  test('should add Imp supply', async () => {
    await startGameGetPlayerAndWaitForStartOfTurn(game);
    expect(game.supplies.get('Imp').cards.length).toBe(13);
  });

  test('should gain Golds', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['DevilsWorkshop', 'DevilsWorkshop']);
    await waitForNextInput();
    respondWithChoice(0);
    await waitForNextInput();
    respondWithCard('DevilsWorkshop');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Gold');
  });

  test('should gain card of choice', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['DevilsWorkshop', 'DevilsWorkshop']);
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('DevilsWorkshop');
    await waitForNextInput();
    respondWithSupply('Silver');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Silver');
  });

  test('should gain Imps', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Festival', 'DevilsWorkshop', 'DevilsWorkshop']);
    await waitForNextInput();
    respondWithCard('Festival');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithSupply('Curse');
    await waitForNextInput();
    respondWithCard('DevilsWorkshop');
    await waitForNextInput();
    expect(player.discardPile.last().title).toBe('Imp');
  });
};
