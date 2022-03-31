import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
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
});
