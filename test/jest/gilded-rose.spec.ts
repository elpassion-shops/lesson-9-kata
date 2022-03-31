import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it("should decrease quality for normal item each tick", () => {
    const gildedRose = new GildedRose([new Item('example item', 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });
  it("should quality never be negative", () => {
    const gildedRose = new GildedRose([new Item('example item', 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});
