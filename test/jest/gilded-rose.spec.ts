import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it("should decrease sellIn", () => {
    const gildedRose = new GildedRose([new Item('example item', 1, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0)
  })

  it("should not decrease quality below 0", () => {
    const gildedRose = new GildedRose([new Item('example item', 1, 0)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0)
  })

  it("should not decrease and increase quality or sellIn for Sulfuras", () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10)
    expect(items[0].quality).toBe(10)
  })

  it("should increase quality of Aged Brie when day passes", () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 10, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9)
    expect(items[0].quality).toBe(11)
  })

  it("should quality degrades twice as fast when the sell by date has passed", () => {
    const gildedRose = new GildedRose([new Item('example', 0, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1)
    expect(items[0].quality).toBe(8)
  })

  it("should not quality more than 50", () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0)
    expect(items[0].quality).not.toBe(51)
  })

  it("should increases quality by 2 of backstage when are 10 days or less", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9)
    expect(items[0].quality).toBe(12)
  })

  it("should increases quality by 3 of backstage when are 5 days or less", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4)
    expect(items[0].quality).toBe(13)
  })

  it("should quality of backstage drops to 0 after the concert", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1)
    expect(items[0].quality).toBe(0)
  })
});
