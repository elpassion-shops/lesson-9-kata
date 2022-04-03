import { Item } from "./Item";

export abstract class OurItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    return this.handle();
  }
  abstract changeQuality();

  protected handleQualityOutOfRange() {
    if (this.quality < 0) {
      this.quality = 0;
    } else if (this.quality > 50) {
      this.quality = 50;
    }

    return this;
  }

  protected decreaseSellIn() {
    this.sellIn--;
    return this;
  }

  handle() {
    return this.changeQuality().handleQualityOutOfRange().decreaseSellIn();
  }
}
