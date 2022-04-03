import { BaseItem } from "./BaseItem";

export class NormalItem extends BaseItem {
  changeQuality() {
    this.quality -= this.sellIn <= 0 ? 2 : 1;
    return this;
  }
}
