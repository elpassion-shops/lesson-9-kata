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
    this.items = this.items.map((item) => {
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        const sulfuras = new SulfurasItem(item.name, item.sellIn, item.quality);

        return sulfuras.changeQuality();
      }

      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        const backstagePasses = new BackstagePasses(
          item.name,
          item.sellIn,
          item.quality
        );

        return backstagePasses.handle();
      }

      if (item.name === "Aged Brie") {
        const agedBrie = new AgedBrie(item.name, item.sellIn, item.quality);

        return agedBrie.handle();
      } else
        return new NormalItem(item.name, item.sellIn, item.quality).handle();
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
    this.changeQuality().handleQualityOutOfRange().decreaseSellIn();
    return this;
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
  }
}

class SulfurasItem extends Item {
  changeQuality() {
    this.quality = 80;
    return this;
  }
}
