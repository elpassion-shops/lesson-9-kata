import { Item } from "./Item";

export class SulfurasItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
    return this.handle();
  }
  handle() {
    this.quality = 80;
    return this;
  }
}
