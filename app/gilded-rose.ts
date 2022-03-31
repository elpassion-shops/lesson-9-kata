import {SulfurasItem} from "@/sulfuras-item";
import {ConjuredItem} from "@/conjured-item";
import {BrieItem} from "@/brie-item";
import {TicketItem} from "@/ticket-item";
import {NormalItem} from "@/normal-item";
import {Item} from "@/item";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private static getItemClass(itemName: string) {
    return {
      'Backstage passes to a TAFKAL80ETC concert': TicketItem,
      'Aged Brie': BrieItem,
      'Sulfuras, Hand of Ragnaros': SulfurasItem,
      'Conjured': ConjuredItem,
    }[itemName] || NormalItem
  }

  updateQuality() {
    this.items = this.items.map((item) => {
      const Item = GildedRose.getItemClass(item.name);
      return new Item(item.name, item.sellIn, item.quality).handle();
    });

    return this.items;
  }
}
