import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should decrese quality for normal item each tick", () => {
    const gildedRose = new GildedRose([new Item("example item", 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(0);
  });
  it("quality should not decrease under 0", () => {
    const gildedRose = new GildedRose([new Item("example item", 1, 1)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
  });
  it("“Aged Brie” actually increases in Quality the older it gets", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 1)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(4);
  });
  it("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const gildedRose = new GildedRose([new Item("new item", 0, 10)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(6);
  });
  it("The Quality of an item is never more than 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });
  it("“Sulfuras”, being a legendary item, never has to be sold or decreases in Quality", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
    expect(gildedRose.items[0].sellIn).toBe(10);
  });
});
