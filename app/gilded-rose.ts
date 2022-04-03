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

  updateQuality() {
    this.items = this.items.map((item) => {
      switch (item.name) {
        case "Sulfuras, Hand of Ragnaros":
          return new SulfurasItem(
            item.name,
            item.sellIn,
            item.quality
          ).changeQuality();

        case "Backstage passes to a TAFKAL80ETC concert":
          return new BackstagePasses(
            item.name,
            item.sellIn,
            item.quality
          ).changeQuality();

        case "Aged Brie":
          return new AgedBrie(
            item.name,
            item.sellIn,
            item.quality
          ).changeQuality();

        default:
          return new NormalItem(
            item.name,
            item.sellIn,
            item.quality
          ).changeQuality();
      }
    });

    return this.items;
  }
}

export abstract class OurItem extends Item {
  abstract changeQuality();

  protected handleQualityOutOfRange() {
    if (this.quality < 0) {
      this.quality = 0;
    } else if (this.quality > 50) {
      this.quality = 50;
    }
    return this;
  }

  protected decreaseSellIn() {
    this.sellIn--;
    return this;
  }

  handle() {
    return this.changeQuality().handleQualityOutOfRange().decreaseSellIn();
  }
}

export class NormalItem extends OurItem {
  changeQuality() {
    this.quality -= this.sellIn <= 0 ? 2 : 1;
    return this;
  }
}

export class AgedBrie extends OurItem {
  changeQuality() {
    this.quality += this.sellIn <= 0 ? 2 : 1;
    return this;
  }
}

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

class SulfurasItem extends Item {
  changeQuality() {
    this.quality = 80;
    return this;
  }
}
