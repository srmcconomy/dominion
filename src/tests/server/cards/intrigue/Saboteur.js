import { test, beforeEach, expect } from '../../testingFramework';
import { createGame, setHand, setDeck, respondWithCard, respondWithSupply, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Saboteur'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Saboteur']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Attack');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should attack!!!!!!!!!!! something wrong with card cost functions');//, async () => {
  //   const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
  //   setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Saboteur']);
  //   const otherPlayer = game.playerOrder.find(p => p !== player);
  //   setDeck(otherPlayer, ['Copper', 'Silver', 'Copper', 'Province', 'Copper']);
  //   await waitForNextInput();
  //   respondWithCard('Saboteur');
  //   await waitForNextInput();
  //   expect(otherPlayer.deck.length).toBe(1);
  //   respondWithSupply('Curse');
  //   await waitForNextInput();
  //   expect(otherPlayer.discardPile.length).toBe(4);
  //   expect(otherPlayer.discardPile.first().title).toBe('Curse');
  //   expect(game.trash.last().title).toBe('Silver');
  // });

  test('Potion cards do not cost between $3-$6');

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Saboteur']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    setDeck(otherPlayer, ['Copper', 'Silver', 'Copper', 'Copper', 'Copper']);
    await waitForNextInput();
    respondWithCard('Saboteur');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.discardPile.length).toBe(0);
  });
};
