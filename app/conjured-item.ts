import {ItemBase} from "@/item-base";

export class ConjuredItem extends ItemBase {
  changeQuality() {
    this.quality -= this.sellIn <= 0 ? 4 : 2;
  }
}
