import { OurItem } from "./OurItem";

export class NormalItem extends OurItem {
  changeQuality() {
    this.quality -= this.sellIn <= 0 ? 2 : 1;
    return this;
  }
}
