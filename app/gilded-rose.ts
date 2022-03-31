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

export abstract class OurItem extends Item {
  abstract changeQuality();

  protected handleOutOfRangeQuality() {
    if (this.quality < 0) this.quality = 0
    if (this.quality > 50) this.quality = 50
  }

  protected decreaseSellIn() {
    this.sellIn -= 1;
  }

  handle() {
    this.changeQuality();
    this.handleOutOfRangeQuality();
    this.decreaseSellIn();
    return this;
  }
}

export class NormalItem extends OurItem {
  changeQuality() {
    this.quality -= this.sellIn <= 0 ? 2 : 1;
  }
}

export class SulfurasItem extends Item {
  handle() {
    return this;
  }
}

export class ConjuredItem extends OurItem {
  changeQuality() {
    this.quality -= this.sellIn <= 0 ? 4 : 2;
  }
}

export class BrieItem extends OurItem {
  changeQuality() {
    this.quality += this.sellIn <= 0 ? 2 : 1;
  }
}

export class TicketItem extends OurItem {
  changeQuality() {
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
  }
}

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
