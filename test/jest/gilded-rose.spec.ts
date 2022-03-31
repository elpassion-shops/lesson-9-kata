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



});
