import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should decrease quality and sellin for normal iteam each tick", () => {
    const gildedRose = new GildedRose([new Item("example item", 1, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toBe(0);
    expect(gildedRose.items[0].quality).toBe(9);
  });

  it("should not decrease quality below 0", () => {
    const gildedRose = new GildedRose([new Item("example item", 1, 1)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("should - Once the sell by date has passed, Quality degrades twice as fast", () => {
    const gildedRose = new GildedRose([new Item("example item", 1, 40)]);
    for (let i = 0; i < 3; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).toBe(35);
  });

  it("should - Aged Brie actually increases in Quality the older it gets", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 1)]);
    for (let i = 0; i < 3; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).toBe(4);
  });

  it("should not Aged Brie have quality more than 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
    for (let i = 0; i < 3; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it("should - Sulfuras, being a legendary item, never has to be sold or decreases in Quality", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 10, 60),
    ]);
    for (let i = 0; i < 3; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).toBe(60);
    expect(gildedRose.items[0].sellIn).toBe(10);
  });

  it("should - “Conjured” items degrade in Quality twice as fast as normal items", () => {
    const gildedRose = new GildedRose([new Item("Conjured", 10, 30)]);
    for (let i = 0; i < 3; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).toBe(24);
  });

  describe("Backstage passes", () => {
    it("should - “Backstage passes”, like aged brie, increases in Quality as its SellIn value approaches", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10),
      ]);
      for (let i = 0; i < 3; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(13);
      expect(gildedRose.items[0].sellIn).toBe(12);
    });
    it("Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
      ]);
      for (let i = 0; i < 6; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(23);
      expect(gildedRose.items[0].sellIn).toBe(4);
    });

    it("Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but not more than 50", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 45),
      ]);
      for (let i = 0; i < 6; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(50);
      expect(gildedRose.items[0].sellIn).toBe(4);
    });
    it("Quality of backstage passes drops to 0 after the concert", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 3, 50),
      ]);
      for (let i = 0; i < 4; i++) {
        gildedRose.updateQuality();
      }
      expect(gildedRose.items[0].quality).toBe(0);
      expect(gildedRose.items[0].sellIn).toBe(-1);
    });
  });
});
