import { OurItem } from "./OurItem";

export class BackstagePasses extends OurItem {
  changeQuality() {
    if (this.sellIn <= 0) {
      this.quality = 0;
    } else if (this.sellIn <= 5) {
      this.quality += 3;
    } else this.quality += this.sellIn <= 10 ? 2 : 1;
    return this;
  }
}
