import {ItemBase} from "@/item-base";

export class BrieItem extends ItemBase {
  changeQuality() {
    this.quality += this.sellIn <= 0 ? 2 : 1;
  }
}
