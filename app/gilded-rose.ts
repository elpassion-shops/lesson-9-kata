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
    for (let i = 0; i < this.items.length; i++) {
      this.updateItemQuality(i)
    }
    return this.items;
  }

  private updateItemQuality(i: number) {
    this.handleSulfuras(i);
    this.handleNormalItems(i);
    if (this.items[i].name === 'Aged Brie') {
      this.items[i].quality += this.items[i].sellIn <= 0 ? 2 : 1;
      if (this.items[i].quality > 50) this.items[i].quality = 50
      this.items[i].sellIn -= 1;
    }
    if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
      let qualityChange = 0;
      if (this.items[i].sellIn > 10) {
        qualityChange = 1;
      } else if (this.items[i].sellIn > 5) {
        qualityChange = 2;
      } else if (this.items[i].sellIn > 0) {
        qualityChange = 3;
      } else {
        this.items[i].quality = 0;
      }
      this.items[i].quality += qualityChange;
      if (this.items[i].quality > 50) this.items[i].quality = 50;
      this.items[i].sellIn -= 1;
    }
  }

  private handleNormalItems(i: number) {
    if (!this.SPECIAL_ITEMS.includes(this.items[i].name)) {
      this.items[i].quality -= this.items[i].sellIn <= 0 ? 2 : 1;
      if (this.items[i].quality < 0) this.items[i].quality = 0
      this.items[i].sellIn -= 1;
    }
  }

  private handleSulfuras(i: number) {
    if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') {
    }
    ;
  }
}
