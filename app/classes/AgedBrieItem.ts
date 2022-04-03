import { BaseItem } from "./BaseItem";

export class AgedBrieItem extends BaseItem {
  changeQuality() {
    this.quality += this.sellIn <= 0 ? 2 : 1;
    return this;
  }
}
