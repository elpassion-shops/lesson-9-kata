import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  it('should  decrease quality', () => {
    const gildedRose = new GildedRose([new Item('example item', 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(0);

  });

  it('should not decrease quality below zero', () => {
    const gildedRose = new GildedRose([new Item('example item', 1, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);

  });

  it('should decrease twice as fast when sell in has passed', () => {
    const gildedRose = new GildedRose([new Item('example item', -1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(8);

  });

  it('“Aged Brie” actually increases in Quality the older it gets', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(11);

  })

  it('should not pass max  item quality value', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it('“Sulfuras, Hand of Ragnaros” never has to be sold or decreases in Quality', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(10);
  })

  it('“Backstage passes to a TAFKAL80ETC concert” increases in Quality as it’s SellIn value approaches', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(11);
  })

  it('“Backstage passes to a TAFKAL80ETC concert” increases in Quality as it’s SellIn value approaches first mark', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(12);
  })


  it('“Backstage passes to a TAFKAL80ETC concert” increases in Quality as it’s SellIn value approaches second mark', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(13);
  })
});
