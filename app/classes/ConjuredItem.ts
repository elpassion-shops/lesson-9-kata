import { BaseItem } from "./BaseItem";

export class ConjuredItem extends BaseItem {
  changeQuality() {
    this.quality -= this.sellIn <= 0 ? 4 : 2;
    return this;
  }
}
