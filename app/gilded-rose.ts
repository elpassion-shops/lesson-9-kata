export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private SPECIAL_ITEMS = [
    "Aged Brie",
    "Sulfuras, Hand of Ragnaros",
    "Backstage passes to a TAFKAL80ETC concert",
  ];

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === "Backstage passes to a TAFKAL80ETC concert") {
        const backstagePasses = new BackstagePasses(
          this.items[i].name,
          this.items[i].sellIn,
          this.items[i].quality
        );

        backstagePasses.updateQuality(this.items, i);
      }

      if (this.items[i].name === "Aged Brie") {
        const agedBrie = new AgedBrie(
          this.items[i].name,
          this.items[i].sellIn,
          this.items[i].quality
        );

        agedBrie.updateQuality(this.items, i);
      }

      if (!this.SPECIAL_ITEMS.includes(this.items[i].name)) {
        const normalItem = new NormalItem(
          this.items[i].name,
          this.items[i].sellIn,
          this.items[i].quality
        );

        normalItem.updateQuality(this.items, i);
      }
    }

    return this.items;
  }
}

class NormalItem extends Item {
  updateQuality(items: Item[], i: number) {
    items[i].quality -= items[i].sellIn <= 0 ? 2 : 1;
    if (items[i].quality < 0) items[i].quality = 0;
    items[i].sellIn--;
    return items;
  }
}

class AgedBrie extends Item {
  updateQuality(items: Item[], i: number) {
    items[i].quality += items[i].sellIn <= 0 ? 2 : 1;
    if (items[i].quality > 50) items[i].quality = 50;
    items[i].sellIn--;
    return items;
  }
}

class BackstagePasses extends Item {
  updateQuality(items: Item[], i: number) {
    if (items[i].sellIn <= 0) {
      items[i].quality = 0;
    } else if (items[i].sellIn <= 5) {
      items[i].quality += 3;
    } else items[i].quality += items[i].sellIn <= 10 ? 2 : 1;

    if (items[i].quality > 50) items[i].quality = 50;
    items[i].sellIn -= 1;
    return items;
  }
}
