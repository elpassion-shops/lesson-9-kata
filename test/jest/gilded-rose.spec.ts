import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  describe("tests for normal items", () => {
    describe("item has proper name", () => {
      it("should be fixme", () => {
        const gildedRose = new GildedRose([new Item("fixme", 0, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe("fixme");
      });
    });

    describe("decrease quality for normal item each day", () => {
      it("quality should decrease by 1 for day", () => {
        const gildedRose = new GildedRose([new Item("example item", 1, 10)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(9);
      });
    });

    describe("Once the sell by date has passed, Quality degrades twice as fast", () => {
      it("quality should be 23", () => {
        const gildedRose = new GildedRose([new Item("foo", 0, 25)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(23);
      });
    });

    describe("decrease quality for normal item cannot be under 0", () => {
      it("quality should be equal 0", () => {
        const gildedRose = new GildedRose([new Item("example item", 1, 0)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
      });
    });
  });

  describe("tests for Backstage", () => {
    it("Backstage quality should be equal 0", () => {
      const gildedRose = new GildedRose([new Item("Backstage", 1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    describe("Backstage passes quality should increase after day", () => {
      it("quality should be equal 26", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 50, 25),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(26);
      });
    });

    describe("Backstage passes quality shouldn't be bigger than 50", () => {
      it("quality should be equal 26", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 50, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });
    });

    describe("Backstage passes quality should be 0 after concert", () => {
      it("quality should be equal 26", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(0);
      });
    });

    describe("Backstage passes quality should increases by 2 when there are 10 days or less", () => {
      it("quality should be 27", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(27);
      });
    });

    describe("Backstage passes quality should increases by 3 when there are 5 days or less", () => {
      it("quality should be 28", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 25),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(28);
      });
    });
  });

  describe("tests for Aged Brie", () => {
    it("Aged Brie quality should be equal 0", () => {
      const gildedRose = new GildedRose([new Item("Backstage", 1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    describe("Aged Brie quality should increases by 1 after day", () => {
      it("quality should be 26", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 5, 25)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(26);
      });
    });

    describe("Aged Brie quality shouldn't be bigger than 50", () => {
      it("quality should be equal 50", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 0, 50)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(50);
      });
    });

    describe("Once the sell by date of Aged Brie has passed, Quality increases twice as fast", () => {
      it("quality should be 23", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 0, 25)]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(27);
      });
    });
  });

  describe("tests for Sulfuras", () => {
    describe("quality for Sulfuras should never change", () => {
      it("Sulfuras, Hand of Ragnaros quality should be equal 20", () => {
        const gildedRose = new GildedRose([
          new Item("Sulfuras, Hand of Ragnaros", 1, 20),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(20);
      });
    });

    describe("Sulfuras” quality is 80", () => {
      it("quality should be 80", () => {
        const gildedRose = new GildedRose([
          new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toBe(80);
      });
    });
  });
});
