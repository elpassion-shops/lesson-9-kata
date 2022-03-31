import {Item} from "@/item";

export abstract class ItemBase extends Item {
  abstract changeQuality();

  protected handleOutOfRangeQuality() {
    if (this.quality < 0) this.quality = 0
    if (this.quality > 50) this.quality = 50
  }

  protected decreaseSellIn() {
    this.sellIn -= 1;
  }

  handle() {
    this.changeQuality();
    this.handleOutOfRangeQuality();
    this.decreaseSellIn();
    return this;
  }
}
