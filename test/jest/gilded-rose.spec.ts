import {GildedRose} from "@/gilded-rose";
import {Item} from "@/item";

describe("Gilded Rose", () => {
  describe("GR for all items", () => {
    it("should not allow the quality of any items to fall below zero", () => {
      const gildedRose = new GildedRose([new Item("Item", 1, 0)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });

    it("should not allow the quality of any items to increase beyond 50", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 10, 50)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(50);
    });
  });

  describe("GR for regular items", () => {
    it("should decrease the quality of regular items by 1 every day", () => {
      const gildedRose = new GildedRose([new Item("Normal item", 1, 1)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });

    it("should decrease the quality of regular items by x 2 every day after the sell date", () => {
      const gildedRose = new GildedRose([new Item("Normal item", 0, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(8);
    });
  });

  describe("GR for Sulfuras", () => {
    let gildedRose;

    beforeEach(() => {
      gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 10, 80),
      ]);
    });

    it("should not decrease the quality of Sulfuras", () => {
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(80);
    });

    it("should not decrease the SellIn deadline for Sulfuras", () => {
      gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toBe(10);
    });
  });

  describe("GR for Aged Brie", () => {
    let gildedRose;

    beforeEach(() => {
      gildedRose = new GildedRose([new Item("Aged Brie", 1, 1)]);
    });

    it("should increase the quality of Aged Brie with time", () => {
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(2);
    });

    it("should increase the quality of Aged Brie after the deadline for sale x2", () => {
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(6);
    });
  });

  describe("GR for Backstage passes", () => {
    it("should increase the quality of Backstage passes by 2 in days 6-10 before deadline for sale", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(12);
    });

    it("should increase the quality of Backstage passes by 3 in the last 5 days before deadline for sale", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 3, 10),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(13);
    });

    it("should decrease the quality of Backstage passes to 0 after the deadline for sale", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(0);
    });
  });

  describe("Conjured", () => {
    it("should degrade in Quality twice as fast as normal items", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 10, 30)]);
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(24);
    });
  });
});
