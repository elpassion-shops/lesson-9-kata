import { Item } from "./Item";


export abstract class OItem extends Item {

  abstract updateQuality(): Item;

  protected handleQualityOutOfRange() {
    if (this.quality > 50)
      this.quality = 50;
    if (this.quality < 0)
      this.quality = 0;
  }
  protected handleSellIn() {
    this.sellIn -= 1;
  }
  handle(): Item {
    this.updateQuality();
    this.handleSellIn();
    this.handleQualityOutOfRange();
    return this;
  }
}
