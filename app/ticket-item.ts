import {ItemBase} from "@/item-base";

export class TicketItem extends ItemBase {
  changeQuality() {
    let qualityChange = 0;
    if (this.sellIn > 10) {
      qualityChange = 1;
    } else if (this.sellIn > 5) {
      qualityChange = 2;
    } else if (this.sellIn > 0) {
      qualityChange = 3;
    } else {
      this.quality = 0;
    }
    this.quality += qualityChange;
  }
}
