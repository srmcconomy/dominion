import Card from 'cards/Card';

export default class Hero extends Card {
  static cost = new Card.Cost({ coin: 6 });
  static types = new Set('Action', 'Reserve');
  async onPlay(player) {
    player.moveCard(this, player.playArea, player.mats.tavern);
  }

  canTriggerOn(event, player) {
    return event.name === 'start-of-turn' && event.triggeringPlayer === player && player.mats.tavern.includes(this);
  }

  async onTrigger(event, player) {
    player.moveCard(this, player.mats.tavern, player.playArea);
    const choices = {
      '+1 Card': 'plusCard',
      '+1 Action': 'plusAction',
      '+1 Buy': 'plusBuy',
      '+1 Coin': 'plusCoin',
    };
    const choice = Object.keys(choices)[await player.selectOption(Object.keys(choices), 'Select which token to move')];
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (
        s.cards.length > 0 &&
        !Object.values(player.supplyTokens).some(other => other === s) &&
        s.cards.last().types.has('Action')
      ),
      message: `Choose a supply to put your ${choice} token on`,
    });
    player.supplyTokens[choices[choice]] = supply;
  }
}
