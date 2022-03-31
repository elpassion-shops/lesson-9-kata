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
  private SPECIAL_ITEMS = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert', 'Sulfuras, Hand of Ragnaros', 'Conjured Mana Cake'];

  private handleFullQuality(i: number) {
    if (this.items[i].quality > 50) this.items[i].quality = 50
    
  }
  private handleSellIn(i: number) {
    this.items[i].sellIn -= 1;
  }
  private handleOutOfDate(i: number) {
    if (this.items[i].quality < 0) this.items[i].quality = 0;
  }
  private handleAgedBrie(i: number) {
    if (this.items[i].name === 'Aged Brie') {
      this.items[i].quality += this.items[i].sellIn <= 0 ? 2 : 1;
      this.handleFullQuality(i)
    }
  }

  private handleNormalItems(i: number) {
    if (!this.SPECIAL_ITEMS.includes(this.items[i].name)) {
      this.items[i].quality -= this.items[i].sellIn <= 0 ? 2 : 1;
      this.handleOutOfDate(i);
      this.handleFullQuality(i);
    }
  }

  private handleSulfuras(i: number) {
    if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') {
    };
  }

  private handleBackstagePasses(i: number) {
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
      this.handleFullQuality(i);

    }
  }
  private handleConjured(i: number) {
    if (this.items[i].name === 'Conjured Mana Cake') {
      console.log(this.items[i].quality);
      this.items[i].quality -= 2;
      console.log(this.items[i].quality);
      this.handleOutOfDate(i);
    }
  }


  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.handleConjured(i);
      this.handleSulfuras(i);
      this.handleNormalItems(i);
      this.handleAgedBrie(i);
      this.handleBackstagePasses(i);


      this.handleSellIn(i);
      // return;
      return this.items;

    }
  }
}