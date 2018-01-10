import Game from 'models/Game';
import Player from 'models/Player';

import { log } from './testingFramework';

import basic from 'cards/basic';
import base from 'cards/base';
import baseSecond from 'cards/baseSecond';
import intrigue from 'cards/intrigue';
import intrigueFirst from 'cards/intrigueFirst';
import seaside from 'cards/seaside';
import cornucopia from 'cards/cornucopia';
// import adventures from 'cards/adventures';

const cardClasses = {
  ...basic,
  ...base,
  ...baseSecond,
  ...intrigue,
  ...intrigueFirst,
  ...seaside,
  ...cornucopia,
  // ...adventures,
};

let currentPlayer;
let currentGame;
let currentInput;

let pauseResolve;
let pausePromise = new Promise(res => { pauseResolve = res; });

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
  pausePromise = new Promise(res => { pauseResolve = res; });
}

function takeTurnStub(player) {
  const oldTakeTurn = player.takeTurn.bind(player);
  return async function takeTurn() {
    currentPlayer = player;
    if (pauseAt.has('start-of-turn')) {
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

export async function createGame({ numPlayers = 2 } = {}) {
  currentGame = new Game();
  for (let i = 0; i < numPlayers; i++) {
    const player = new Player(`Player${i}`, currentGame);
    player.socket = {
      emit() {},
      emitAndWait: emitStub.bind(player),
    };
    player.takeTurn = takeTurnStub(player);
  }
  pausePromise = new Promise(res => { pauseResolve = res; });
  resumePromise = new Promise(res => { resumeResolve = res; });
  return currentGame;
}

export async function startGameGetPlayerAndWaitForStartOfTurn(game) {
  pauseAt.add('start-of-turn');
  game.start();
  await waitForPause();
  return game.currentPlayer;
}

export function respondWith(response) {
  nextResponse = response;
}

export function respondWithCardFromHand(cardName) {
  respondWith({
    type: 'select-cards',
    data: [currentPlayer.hand.find(card => card.title === cardName).id],
  });
}

export function respondWithCardsFromHand(cardNames) {
  const cards = [];
  cardNames.forEach(title => {
    cards.push(currentPlayer.hand.find(card => card.title === title && !cards.includes(card.id)).id);
  });
  respondWith({
    type: 'select-cards',
    data: cards
  });
}

export function respondWithChoice(choice) {
  respondWith({
    type: 'select-option',
    data: choice,
  });
}

export async function waitForNextInput() {
  resumeResolve();
  await waitForPause();
  return { player: currentPlayer, input: currentInput, lastInputWasValid: currentInput.lastInputWasInvalid === undefined };
}

export function setHand(player, cards) {
  const newHand = cards.map(title => new cardClasses[title](player.game));
  player.hand.clear();
  player.hand.push(...newHand);
}


export function setStartingDeck(cardNames) {
  currentGame.startingDeck = () => cardNames.map(title => new cardClasses[title](currentGame));
}
