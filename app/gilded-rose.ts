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
        if (this.items[i].sellIn <= 0) {
          this.items[i].quality = 0;
        } else if (this.items[i].sellIn <= 5) {
          this.items[i].quality += 3;
        } else this.items[i].quality += this.items[i].sellIn <= 10 ? 2 : 1;

        if (this.items[i].quality > 50) this.items[i].quality = 50;
        this.items[i].sellIn -= 1;
        return this.items;
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
