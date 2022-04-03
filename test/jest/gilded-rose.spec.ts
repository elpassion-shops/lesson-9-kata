import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  describe("updateQuality for normal items", () => {
    it("quality should decrease by 1 for day", () => {
      const gildedRose = new GildedRose([new Item("example item", 1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(9);
    });

    it("once the sell by date has passed, quality should degrades twice as fast", () => {
      const gildedRose = new GildedRose([new Item("foo", 0, 25)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(23);
    });

    it("quality should't be under 0", () => {
      const gildedRose = new GildedRose([new Item("example item", 1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("sellIn should decrease by 1 for day", () => {
      const gildedRose = new GildedRose([new Item("example item", 1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
    });
  });

  describe("updateQuality for Backstage", () => {
    it("quality should increase after day", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 50, 25),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(26);
    });

    it("quality should increases by 2 when there are 10 days or less", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(27);
    });

    it("Backstage passes quality should increases by 3 when there are 5 days or less", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 25),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(28);
    });

    it("quality should drops to 0 after the concert", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("quality shouldn't be bigger than 50", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 50, 50),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    it("sellIn should decrease by 1 for day", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 1, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
    });
  });

  describe("updateQuality for Aged Brie", () => {
    it("quality should increases by 1 after day", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 5, 25)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(26);
    });

    it("once the sell by date has passed, Quality increases twice as fast", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 25)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(27);
    });

    describe("quality shouldn't be bigger than 50", () => {
      it("quality should be equal 50", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 0, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });

      it("sellIn should decrease by 1 after day", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 1, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toBe(0);
      });
    });
  });

  describe("tests for Sulfuras", () => {
    it("quality should never change", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 1, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
    });
  });
});
