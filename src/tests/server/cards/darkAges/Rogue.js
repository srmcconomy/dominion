import { test, beforeEach, expect , log} from '../../testingFramework';
import { createGame, setHand, setDeck, setTrash, respondWithCard, startGameGetPlayerAndWaitForStartOfTurn, waitForNextInput } from '../../toolbox';

export default () => {
  let game;

  beforeEach(async () => {
    game = await createGame();
    game.getKingdomCards = () => ['Rogue'];
  });

  test('Card should cost correct amount and have proper types', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Rogue']);
    const card = player.hand.last();
    expect(card.types).toHave('Action');
    expect(card.types).toHave('Attack');
    expect(card.types.size).toBe(2);
    expect(card.cost.coin).toBe(5);
    expect(card.cost.potion).toBe(0);
    expect(card.cost.debt).toBe(0);
  });

  test('should attack and gain', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Village', 'Rogue', 'Rogue']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Gold', 'Silver']);
    await waitForNextInput();
    respondWithCard('Village');
    await waitForNextInput();
    respondWithCard('Rogue');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(game.trash.last().title).toBe('Gold');
    expect(otherPlayer.discardPile.last().title).toBe('Silver');
    expect(player.money).toBe(2);
    respondWithCard('Rogue');
    await waitForNextInput();
    respondWithCard('Gold');
    await waitForNextInput();
    expect(game.trash.length).toBe(0);
    expect(player.discardPile.last().title).toBe('Gold');
    expect(player.money).toBe(4);
  });

  test('!!!!!!!!!!!!SOmething seriously wrong with the card cost comparisons!!!!!!!!!!!!!!!!!');
  // test('should attack if trash has no valid targets', async () => {
  //   const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
  //   setHand(player, ['Copper', 'Copper', 'Rogue']);
  //   setTrash(game, ['Copper', 'Estate', 'Province']);
  //   const otherPlayer = game.playerOrder.find(p => p !== player);
  //   setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Gold', 'Silver']);
  //   await waitForNextInput();
  //   respondWithCard('Rogue');
  //   await waitForNextInput();
  //   log(game.trash);
  //   log(otherPlayer.deck);
  //   respondWithCard('Estate');
  //   await waitForNextInput();
  //   log(game.trash);
  //   log(otherPlayer.deck);
  //   expect(game.trash.last().title).toBe('Gold');
  //   expect(otherPlayer.discardPile.last().title).toBe('Silver');
  //   expect(player.money).toBe(2);
  // });

  test('should proc on gain effects, Death Cart');

  test('should be blocked by Moat', async () => {
    const player = await startGameGetPlayerAndWaitForStartOfTurn(game);
    setHand(player, ['Copper', 'Copper', 'Copper', 'Copper', 'Militia']);
    const otherPlayer = game.playerOrder.find(p => p !== player);
    setHand(otherPlayer, ['Copper', 'Copper', 'Copper', 'Copper', 'Moat']);
    setDeck(otherPlayer, ['Copper', 'Copper', 'Copper', 'Gold', 'Silver']);
    await waitForNextInput();
    respondWithCard('Militia');

    let { player: inputPlayer, lastInputWasValid } = await waitForNextInput();
    expect(inputPlayer).toBe(otherPlayer);
    expect(lastInputWasValid).toBe(true);
    respondWithCard('Moat');

    ({ player: inputPlayer, lastInputWasValid } = await waitForNextInput());
    expect(lastInputWasValid).toBe(true);

    expect(otherPlayer.hand.length).toBe(5);
    expect(otherPlayer.deck.length).toBe(5);
    expect(otherPlayer.discardPile.length).toBe(0);
  });
};
