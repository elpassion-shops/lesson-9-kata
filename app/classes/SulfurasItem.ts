import { Item } from "./Item";

export class SulfurasItem extends Item {
  handle() {
    this.quality = 80;
    return this;
  }
}
