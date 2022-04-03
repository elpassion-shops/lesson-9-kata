import { OurItem } from "./OurItem";

export class ConjuredItem extends OurItem {
  changeQuality() {
    this.quality -= this.sellIn <= 0 ? 4 : 2;
    return this;
  }
}
