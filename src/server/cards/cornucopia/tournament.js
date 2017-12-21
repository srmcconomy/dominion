import Card from 'cards/Card';
import Pile from 'utils/Pile';
import BagOfGold from 'cards/cornucopia/bagOfGold';
import Diadem from 'cards/cornucopia/diadem';
import Followers from 'cards/cornucopia/followers';
import Princess from 'cards/cornucopia/princess';
import TrustySteed from 'cards/cornucopia/trustySteed';

export default class Tournament extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const promises = player.game.playerOrder.map(other =>
      other.selectCards({
        min: 0,
        max: 1,
        predicate: c => c.title === 'Province',
        message: 'You may reveal a Provincet'
      })
    );
    const cards = (await Promise.all(promises)).map(a => a[0]);
    let weShowed = false;
    let otherShowed = false;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i]) {
        player.game.log(`${player.game.playerOrder[i].name} shows a Province`);
        if (i === player.game.currentPlayerIndex) {
          weShowed = true;
        } else {
          otherShowed = true;
        }
      }
    }
    if (weShowed) {
      player.discard(cards[player.game.currentPlayerIndex]);
      player.game.prizePile.forEach(c => console.log(c.title));
      const choice = await player.selectOption(['Gain a Prize', 'Gain a Duchy']);
      switch (choice) {
        case 0:
          {
            const [card] = await player.selectCards({
              min: 1,
              max: 1,
              pile: player.game.prizePile,
              message: 'Choose your Prize'
            });
            if (card) await player.gainSpecificCard(card, player.game.prizePile);
          }
          break;
        case 1:
          await player.gain('Duchy');
          break;
        default:
          break;
      }
    }
    if (!otherShowed) {
      await player.draw(1);
      player.money++;
    }
  }
  static setup(game) {
    game.prizePile.push(new BagOfGold(game));
    game.prizePile.push(new Diadem(game));
    game.prizePile.push(new Followers(game));
    game.prizePile.push(new Princess(game));
    game.prizePile.push(new TrustySteed(game));
  }
}
