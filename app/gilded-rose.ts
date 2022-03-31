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

  private SPECIAL_ITEMS = ['Aged Brie', 'Sulfuras, Hand of Ragnaros', 'Backstage passes to a TAFKAL80ETC concert']

  updateQuality() {
    this.items.forEach((item) => {
      this.updateItemQuality(item)
    });
    return this.items;
  }

  private updateItemQuality(item: Item) {
    this.handleSulfuras(item);
    this.handleNormalItems(item);
    this.handleAgedBrie(item);
    this.handleBackstage(item);
  }

  private handleBackstage(item: Item) {
    if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      let qualityChange = 0;
      if (item.sellIn > 10) {
        qualityChange = 1;
      } else if (item.sellIn > 5) {
        qualityChange = 2;
      } else if (item.sellIn > 0) {
        qualityChange = 3;
      } else {
        item.quality = 0;
      }
      item.quality += qualityChange;
      if (item.quality > 50) item.quality = 50;
      item.sellIn -= 1;
    }
  }

  private handleAgedBrie(item: Item) {
    if (item.name === 'Aged Brie') {
      item.quality += item.sellIn <= 0 ? 2 : 1;
      if (item.quality > 50) item.quality = 50
      item.sellIn -= 1;
    }
  }

  private handleNormalItems(item: Item) {
    if (!this.SPECIAL_ITEMS.includes(item.name)) {
      item.quality -= item.sellIn <= 0 ? 2 : 1;
      if (item.quality < 0) item.quality = 0
      item.sellIn -= 1;
    }
  }

  private handleSulfuras(item: Item) {
    if (item.name === 'Sulfuras, Hand of Ragnaros') {}
  }
}
