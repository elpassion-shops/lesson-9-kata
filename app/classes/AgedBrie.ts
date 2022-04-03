import { OurItem } from "./OurItem";

export class AgedBrie extends OurItem {
  changeQuality() {
    this.quality += this.sellIn <= 0 ? 2 : 1;
    return this;
  }
}
