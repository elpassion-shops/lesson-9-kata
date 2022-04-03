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

  private static getItemClass(itemName: string) {
    return (
      {
        "Sulfuras, Hand of Ragnaros": SulfurasItem,
        "Backstage passes to a TAFKAL80ETC concert": BackstagePasses,
        "Aged Brie": AgedBrie,
      }[itemName] || NormalItem
    );
  }

  updateQuality() {
    this.items = this.items.map((item) => {
      const itemClass = GildedRose.getItemClass(item.name);
      return new itemClass(item.name, item.sellIn, item.quality).handle();
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
  handle() {
    this.quality = 80;
    return this;
  }
}
