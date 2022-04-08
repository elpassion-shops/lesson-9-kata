import { OItem } from "./OItem";


export class ConjuredItem extends OItem {
  updateQuality() {
    this.quality -= this.sellIn <= 0 ? 4 : 2;
    return this;
  }

}
