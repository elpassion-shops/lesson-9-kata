import { OItem } from "./OItem";


export class AgedBrie extends OItem {
  updateQuality() {
    this.quality += this.sellIn <= 0 ? 2 : 1;

    return this;
  }
}
