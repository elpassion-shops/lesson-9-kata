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
  it("should decrease both value for normal item each tick", () => {
    const gildedRose = new GildedRose([new Item('normal item', 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(9);
  });
  it("should quality decrease twice as fast after sell by date", () => {
    const gildedRose = new GildedRose([new Item('normal item', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
  });
});
