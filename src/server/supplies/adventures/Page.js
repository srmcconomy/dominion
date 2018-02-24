
import SupplyFactory from 'supplies/SupplyFactory';
import Page from 'cards/adventures/Page';

export default class PageSupply extends SupplyFactory(Page) {
  static getDependencies() {
    return ['TreasureHunter', 'Warrior', 'Hero', 'Champion'];
  }
}
