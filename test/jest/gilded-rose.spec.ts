import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
    it("should decrease quality each day", () => {
      const gildedRose = new GildedRose([new Item("example item", 1, 10)]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(9);
    }),
      it("should decrease sellIn each day", () => {
        const gildedRose = new GildedRose([new Item("example item", 1, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].sellIn).toBe(0);
      }),
      it("shouldn't decrease quality below 0", () => {
        const gildedRose = new GildedRose([new Item("example item", 1, 0)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(0);
      }),
      it("should decrease quality twiceeach day after sell by date has passed", () => {
        const gildedRose = new GildedRose([new Item("example item", -1, 10)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(8);
      });
  }),
    describe("sulfuras", () => {
      it("should never decrease quality for Sulfuras", () => {
        const gildedRose = new GildedRose([
          new Item("Sulfuras, Hand of Ragnaros", -1, 35),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(35);
      }),
        it("should increase quality for Sulfuras up to 80", () => {
          const gildedRose = new GildedRose([
            new Item("Sulfuras, Hand of Ragnaros", 3, 80),
          ]);
          gildedRose.updateQuality();
          expect(gildedRose.items[0].quality).toBe(80);
        });
    }),
    describe("Aged Brie", () => {
      it("should increase quality", () => {
        const gildedRose = new GildedRose([new Item("Aged Brie", 5, 35)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(36);
      }),
        it("should increase quality twiceafter sell by date", () => {
          const gildedRose = new GildedRose([new Item("Aged Brie", -1, 35)]);
          gildedRose.updateQuality();
          expect(gildedRose.items[0].quality).toBe(37);
        }),
        it("shouldn't increase quality twice for more than 50", () => {
          const gildedRose = new GildedRose([new Item("Aged Brie", -1, 50)]);
          gildedRose.updateQuality();
          expect(gildedRose.items[0].quality).toBe(50);
        });
    });
  describe("Backstage Passes", () => {
    it("shouldn't increase quality twice for more than 50", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 3, 50),
      ]);
      gildedRose.updateQuality();
      expect(gildedRose.items[0].quality).toBe(50);
    }),
      it("should increase qualityas its SellIn value approaches and it'smore than 10 days to concert", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 15, 35),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(36);
      }),
      it("should increase quality twice when there are less than 10 days or more than 5 days to the concert", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 6, 35),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(37);
      }),

      it("should increase quality three times when there are less than 5 days or more than 0 days to the concert", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 3, 35),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(38);
      }),
      it("should decrease quality to 0 after day of a concert", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", -1, 35),
        ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(0);
      });
  }),
    describe("Conjured items", () => {
      it("should decrease quality twice as fast as normal items", () => {
        const gildedRose = new GildedRose([new Item("Conjured item", 3, 35)]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].quality).toBe(33);
      });
    });