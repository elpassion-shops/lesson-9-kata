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
    for (const item of this.items) {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        const sulfuras = new SulfurasItem(item.name, item.sellIn, item.quality);

        sulfuras.updateQuality(item);
      }

      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        const backstagePasses = new BackstagePasses(
          item.name,
          item.sellIn,
          item.quality
        );

        backstagePasses.updateQuality(item);
      }

      if (item.name === "Aged Brie") {
        const agedBrie = new AgedBrie(item.name, item.sellIn, item.quality);

        agedBrie.updateQuality(item);
      }

      if (!this.SPECIAL_ITEMS.includes(item.name)) {
        const normalItem = new NormalItem(item.name, item.sellIn, item.quality);

        normalItem.updateQuality(item);
      }
    }

    return this.items;
  }
}

class NormalItem extends Item {
  updateQuality(item: Item) {
    item.quality -= item.sellIn <= 0 ? 2 : 1;
    if (item.quality < 0) item.quality = 0;
    item.sellIn--;
    return item;
  }
}

class AgedBrie extends Item {
  updateQuality(item: Item) {
    item.quality += item.sellIn <= 0 ? 2 : 1;
    if (item.quality > 50) item.quality = 50;
    item.sellIn--;
    return item;
  }
}

class BackstagePasses extends Item {
  updateQuality(item: Item) {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else if (item.sellIn <= 5) {
      item.quality += 3;
    } else item.quality += item.sellIn <= 10 ? 2 : 1;

    if (item.quality > 50) item.quality = 50;
    item.sellIn -= 1;
    return item;
  }
}

class SulfurasItem extends Item {
  updateQuality(item: Item) {
    item.quality = 80;
    return this;
  }
}
