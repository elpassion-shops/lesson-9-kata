import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {

  it.skip('should  decrease quality', () => {
    const gildedRose = new GildedRose([new Item('example item', 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(0);

  })

  it.skip('should not decrease quality below zero', () => {
    const gildedRose = new GildedRose([new Item('example item', 1, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);

  })



});
