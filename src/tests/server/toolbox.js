import Game from 'models/Game';
import Player from 'models/Player';
import Card from 'cards/Card';

import { log } from './testingFramework';

import basic from 'cards/basic';
import base from 'cards/base';
import baseSecond from 'cards/baseSecond';
import intrigue from 'cards/intrigue';
import intrigueFirst from 'cards/intrigueFirst';
import seaside from 'cards/seaside';
import cornucopia from 'cards/cornucopia';
import adventures from 'cards/adventures';
import guilds from 'cards/guilds';
import darkAges from 'cards/darkAges';
import nocturn from 'cards/nocturn';

const cardClasses = {
  ...basic,
  ...base,
  ...baseSecond,
  ...intrigue,
  ...intrigueFirst,
  ...seaside,
  ...cornucopia,
  ...adventures,
  ...guilds,
  ...darkAges,
  ...nocturn,
};

let currentPlayer;
let currentGame;
let currentInput;

let pauseResolve;
let pauseReject;
let pausePromise = new Promise((res, rej) => {
  pauseResolve = res;
  pauseReject = rej;
});

let resumeResolve;
let resumePromise = new Promise(res => { resumeResolve = res; });

const pauseAt = new Set();

let nextResponse;

async function waitForResume() {
  pauseResolve();
  await resumePromise;
  resumePromise = new Promise(res => { resumeResolve = res; });
}

async function waitForPause() {
  await pausePromise;
  pausePromise = new Promise((res, rej) => {
    pauseResolve = res;
    pauseReject = rej;
  });
}

function takeTurnStub(player) {
  const oldTakeTurn = player.takeTurn.bind(player);
  return async function takeTurn() {
    currentPlayer = player;
    if (pauseAt.has('start-of-turn')) {
      currentInput = null;
      await waitForResume();
    }
    return oldTakeTurn();
  };
}

async function emitStub(type, { payload }) {
  currentInput = payload;
  currentPlayer = this;
  await waitForResume();
  return nextResponse;
}

export async function createGame(numPlayers = 2) {
  currentGame = new Game();
  for (let i = 0; i < numPlayers; i++) {
    const player = new Player(`Player${i}`, currentGame);
    player.socket = {
      emit() {},
      emitAndWait: emitStub.bind(player),
    };
    player.takeTurn = takeTurnStub(player);
  }
  pausePromise = new Promise((res, rej) => {
    pauseResolve = res;
    pauseReject = rej;
  });
  resumePromise = new Promise(res => { resumeResolve = res; });
  return currentGame;
}

export async function startGameGetPlayerAndWaitForStartOfTurn(game) {
  pauseAt.add('start-of-turn');
  game.start().catch(e => pauseReject(e));
  await waitForPause();
  pauseAt.delete('start-of-turn');
  return game.currentPlayer;
}

export function respondWith(response) {
  nextResponse = response;
}

export function respondWithFirstCard() {
  if (!currentInput.selectCards) {
    throw new Error('Invalid response: not expecting card selection');
  }
  respondWith({
    type: 'select-cards',
    data: [currentInput.selectCards.cards[0]],
  });
}

export function respondWithCards(cardNames) {
  if (!currentInput.selectCards) {
    throw new Error('Invalid response: not expecting card selection');
  }
  const includedIDs = new Set();
  respondWith({
    type: 'select-cards',
    data: cardNames.map(cardName => {
      const cardID = currentInput.selectCards.cards.find(id => Card.fromID(id).title === cardName && !includedIDs.has(id));
      if (!cardID) {
        throw new Error('Invalid response: card may not be selected');
      }
      includedIDs.add(cardID);
      return cardID;
    }),
  });
}

export function respondWithNoCards() {
  if (!currentInput.selectCards) {
    throw new Error('Invalid response: not expecting card selection');
  }
  respondWith({
    type: 'select-cards',
    data: [],
  });
}

export function respondWithCard(cardName) {
  return respondWithCards([cardName]);
}

export function respondWithSupply(title) {
  if (!currentInput.selectSupplies) {
    throw new Error('Invalid response: not expecting supply selection');
  }
  respondWith({
    type: 'select-supply',
    data: [title],
  });
}

export function respondWithChoice(choice) {
  if (!currentInput.selectOption) {
    throw new Error('Invalid response: not expecting option selection');
  }
  respondWith({
    type: 'select-option',
    data: choice,
  });
}

export async function waitForNextInput() {
  resumeResolve();
  await waitForPause();
  return { player: currentPlayer, input: currentInput, lastInputWasValid: currentInput ? currentInput.lastInputWasInvalid === undefined : true };
}

export function setHand(player, cards) {
  const newHand = cards.map(title => new cardClasses[title](player.game));
  player.hand.clear();
  player.hand.push(...newHand);
}

export function setDiscardPile(player, cards) {
  const newDiscardPile = cards.map(title => new cardClasses[title](player.game));
  player.discardPile.clear();
  player.discardPile.push(...newDiscardPile);
}

export function setDeck(player, cards) {
  const newDeck = cards.map(title => new cardClasses[title](player.game));
  player.deck.clear();
  player.deck.push(...newDeck);
}

export function setTrash(game, cards) {
  const newTrash = cards.map(title => new cardClasses[title](game));
  game.trash.clear();
  game.trash.push(...newTrash);
}

export function setStartingDeck(cardNames) {
  currentGame.startingDeck = () => cardNames.map(title => new cardClasses[title](currentGame));
}

export async function skipToNextTurn(player) {
  let input;
  let inputPlayer;
  if (player === currentPlayer) {
    ({ input, player: inputPlayer } = await waitForNextInput());
    while (inputPlayer === player) {
      if (input.selectOption) {
        respondWithChoice(0);
      } else if (input.selectCards.min === 0) {
        respondWithCards([]);
      } else if (input.selectCards.min > 0) {
        respondWithFirstCard();
      }
      ({ input, player: inputPlayer } = await waitForNextInput());
    }
  } else {
    pauseAt.add('start-of-turn');
    ({ input, player: inputPlayer } = await waitForNextInput());
  }
  pauseAt.add('start-of-turn');
  while (inputPlayer !== player) {
    if (input.selectOption) {
      respondWithChoice(0);
    } else if (input.selectCards.min === 0) {
      respondWithCards([]);
    } else if (input.selectCards.min > 0) {
      respondWithFirstCard();
    }
    ({ input, player: inputPlayer } = await waitForNextInput());
  }
  pauseAt.delete('start-of-turn');
}
