import { Item } from "./Item";

export abstract class BaseItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
    return this.handle();
  }
  abstract changeQuality(): BaseItem;

  protected handleQualityOutOfRange(): BaseItem {
    if (this.quality < 0) {
      this.quality = 0;
    } else if (this.quality > 50) {
      this.quality = 50;
    }

    return this;
  }

  protected decreaseSellIn(): BaseItem {
    this.sellIn--;
    return this;
  }

  handle() {
    return this.changeQuality().handleQualityOutOfRange().decreaseSellIn();
  }
}
