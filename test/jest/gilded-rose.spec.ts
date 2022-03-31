import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
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

  describe("quality for normal item cannot be under 0", () => {
    it("quality should be equal 0", () => {
      const gildedRose = new GildedRose([new Item("example item", 1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });
});
