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
  it("should 'Aged Brie' quality increase older it gets", () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(11);
  });
  it("should quality never be more than 50", () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(50);
  });
  it("should 'Sulfuras' quality and sellIn never change", () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(10);
  });
  it("should 'Backstage passes' drops to 0 after the concert", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });
  it("should 'Backstage passes' increase quality by 2 when there are 10 days or less", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(12);
  });
  it("should 'Backstage passes' increase quality by 3 when there are 5 days or less", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(13);
  });
  it("should 'Conjured' quality decrease twice as fast", () => {
    const gildedRose = new GildedRose([new Item('Conjured', 1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(8);
  });
});
