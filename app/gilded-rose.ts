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

export class NormalItem extends Item {
  handle() {
    this.quality -= this.sellIn <= 0 ? 2 : 1;
    if (this.quality < 0) this.quality = 0
    this.sellIn -= 1;
    return this;
  }
}

export class SulfurasItem extends Item {
  handle() {
    return this;
  }
}

export class BrieItem extends Item {
  handle() {
    this.quality += this.sellIn <= 0 ? 2 : 1;
    if (this.quality > 50) this.quality = 50
    this.sellIn -= 1;
    return this;
  }
}

export class TicketItem extends Item {
  handle() {
    let qualityChange = 0;
    if (this.sellIn > 10) {
      qualityChange = 1;
    } else if (this.sellIn > 5) {
      qualityChange = 2;
    } else if (this.sellIn > 0) {
      qualityChange = 3;
    } else {
      this.quality = 0;
    }
    this.quality += qualityChange;
    if (this.quality > 50) this.quality = 50;
    this.sellIn -= 1;
    return this;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items = this.items.map((item) => {
      return this.updateItemQuality(item)
    });

    return this.items;
  }

  private updateItemQuality(item: Item): Item {
    switch (item.name) {
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new TicketItem(item.name, item.sellIn, item.quality).handle()
      case 'Aged Brie':
        return new BrieItem(item.name, item.sellIn, item.quality).handle()
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasItem(item.name, item.sellIn, item.quality).handle();
      default:
        return new NormalItem(item.name, item.sellIn, item.quality).handle();
    }
  }
}
