import { Item, GildedRose } from "@/gilded-rose";
import { ItemsEnum } from "../../types/items.enum";
describe("Gilded Rose", () => {
  describe("for ordinary object", () => {
    it("should lower quality by one before sell day", () => {
      const gildedRose1 = new GildedRose([
        new Item(ItemsEnum.ORDINARY, 10, 30),
      ]);
      gildedRose1.updateQuality();
      expect(gildedRose1.items[0].quality).toBe(29);
    });

    it("should lower quality twice after sell day", () => {
      const gildedRose1 = new GildedRose([new Item(ItemsEnum.ORDINARY, 0, 30)]);
      gildedRose1.updateQuality();
      expect(gildedRose1.items[0].quality).toBe(28);
    });
  });

  describe("for aged brie", () => {
    it("should not increase quality above 50", () => {
      const gildedRose1 = new GildedRose([new Item(ItemsEnum.BRIE, 10, 50)]);
      gildedRose1.updateQuality();
      expect(gildedRose1.items[0].quality).toBe(50);
    });
  });

  describe("for sulfurus", () => {
    it("should not change quality - always 80", () => {
      const gildedRose1 = new GildedRose([
        new Item(ItemsEnum.SULFURAS, 10, 80),
      ]);
      gildedRose1.updateQuality();
      expect(gildedRose1.items[0].quality).toBe(80);
    });
  });

  describe("for backstage pass", () => {
    it("should not increase quality above 0", () => {
      const gildedRose1 = new GildedRose([
        new Item(ItemsEnum.BACKSTAGE, 14, 50),
      ]);
      gildedRose1.updateQuality();
      gildedRose1.updateQuality();
      expect(gildedRose1.items[0].quality).toBe(50);
      expect(gildedRose1.items[0].sellIn).toBe(12);
    });
    it("should increase quality twice between 10 and 6 day before sell", () => {
      const gildedRose1 = new GildedRose([
        new Item(ItemsEnum.BACKSTAGE, 9, 10),
      ]);
      gildedRose1.updateQuality();
      gildedRose1.updateQuality();
      expect(gildedRose1.items[0].quality).toBe(14);
      expect(gildedRose1.items[0].sellIn).toBe(7);
    });

    it("should increase quality three times between 5 and 0 day before sell", () => {
      const gildedRose1 = new GildedRose([
        new Item(ItemsEnum.BACKSTAGE, 4, 10),
      ]);
      gildedRose1.updateQuality();
      gildedRose1.updateQuality();
      expect(gildedRose1.items[0].quality).toBe(16);
      expect(gildedRose1.items[0].sellIn).toBe(2);
    });

    it("should drop quality to zero after sell day", () => {
      const gildedRose1 = new GildedRose([
        new Item(ItemsEnum.BACKSTAGE, 0, 10),
      ]);
      gildedRose1.updateQuality();
      gildedRose1.updateQuality();
      expect(gildedRose1.items[0].quality).toBe(0);
      expect(gildedRose1.items[0].sellIn).toBe(-2);
    });
  });
});
