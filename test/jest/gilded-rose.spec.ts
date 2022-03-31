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
  describe("“Backstage passes”, like aged brie, increases in Quality as its SellIn value approaches", () => {
    it("Quality increases by 2 when there are 10 days or less", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(22);
    });
    it("Quality increases by by 3 when there are 5 days or less", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(23);
    });
    it("Quality drops to 0 after the concer", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });
  });
});
