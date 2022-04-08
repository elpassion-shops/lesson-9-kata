import { AgedBrie } from "./AgedBrie";
import { BackstagePass } from "./BackstagePass";
import { ConjuredItem } from "./ConjuredItem";
import { Item } from "./Item";
import { StandardItem } from "./StandardItem";
import { Sulfuras } from "./Sulfuras";




export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }


  updateQuality() {
    this.items = this.items.map((item) => {
      const itemClass = GildedRose.getItemClass(item.name);
      return new itemClass(item.name, item.sellIn, item.quality).handle();
    });
  }

  private static getItemClass(itemName: string) {

    return {
      'Aged Brie': AgedBrie,
      'Backstage passes to a TAFKAL80ETC concert': BackstagePass,
      'Sulfuras, Hand of Ragnaros': Sulfuras,
      'Conjured Mana Cake': ConjuredItem,
    }[itemName] || StandardItem;
  }



  // handleQualityItem(item: Item): Item {

  //   switch (item.name) {

  //     case SPECIAL_ITEMS.SULFURAS:
  //       return new Sulfuras(item.name, item.sellIn, item.quality).handle();
  //     case SPECIAL_ITEMS.BRIE:
  //       return new AgedBrie(item.name, item.sellIn, item.quality).handle();
  //     case SPECIAL_ITEMS.PASS:
  //       return new BackstagePass(item.name, item.sellIn, item.quality).handle();
  //     case SPECIAL_ITEMS.CAKE:
  //       return new ConjuredItem(item.name, item.sellIn, item.quality).handle();
  //     default:
  //       return new StandardItem(item.name, item.sellIn, item.quality).handle();
  //   }


  // }

};