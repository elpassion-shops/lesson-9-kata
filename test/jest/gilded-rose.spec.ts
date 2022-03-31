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
it("should not quality exceed 50", () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 1, 50)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0)
    expect(items[0].quality).not.toBe(51)
  })

  it("should increase quality +2 of Backstage when is <=10 day of sellIn", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9)
    expect(items[0].quality).toBe(12)
  })

  it("should increase quality +3 of Backstage when is <=5 day sellIn", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4)
    expect(items[0].quality).toBe(13)
  })

  it("should quality of Backstage drops to 0 after the concert", () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)])
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1)
    expect(items[0].quality).toBe(0)
  })
});