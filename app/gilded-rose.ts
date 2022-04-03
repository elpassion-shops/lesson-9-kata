import { Item } from "./classes/Item";
import { NormalItem } from "./classes/NormalItem";
import { SulfurasItem } from "./classes/SulfurasItem";
import { BackstagePassesItem } from "./classes/BackstagePassesItem";
import { AgedBrieItem } from "./classes/AgedBrieItem";
import { ConjuredItem } from "./classes/ConjuredItem";

export class GildedRose {
  items: Item[];

  constructor(items = [] as Item[]) {
    this.items = items;
  }

  private static getItemClass(itemName: string) {
    return (
      {
        "Sulfuras, Hand of Ragnaros": SulfurasItem,
        "Backstage passes to a TAFKAL80ETC concert": BackstagePassesItem,
        "Aged Brie": AgedBrieItem,
        "Conjured Mana Cake": ConjuredItem,
      }[itemName] || NormalItem
    );
  }

  updateInventory() {
    this.items = this.items.map((item) => {
      const itemClass = GildedRose.getItemClass(item.name);
      return new itemClass(item.name, item.sellIn, item.quality);
    });

    return this.items;
  }
}
