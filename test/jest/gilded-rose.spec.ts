import { Item, GildedRose } from "@/gilded-rose";
import { ItemsEnum } from "../../types/items.enum";
describe("Gilded Rose", () => {
  describe("for all object expect of Sulfuras", () => {
    it("shouldn't have quality below 0", () => {
      const gildedRose1 = new GildedRose([new Item(ItemsEnum.ORDINARY, 10, 1)]);
      gildedRose1.updateQuality();
      gildedRose1.updateQuality();
      expect(gildedRose1.items[0].quality).toBe(0);

      const gildedRose2 = new GildedRose([new Item(ItemsEnum.BRIE, 0, 0)]);
      gildedRose2.updateQuality();
      gildedRose2.updateQuality();
      expect(gildedRose2.items[0].quality).toBe(4);

      // const gildedRose3 = new GildedRose([new Item(ItemsEnum.CONJURY, 0, 20)]);
      // gildedRose3.updateQuality();
      // gildedRose3.updateQuality();
      // expect(gildedRose3.items[0].quality).toBe(0);

      const gildedRose4 = new GildedRose([new Item(ItemsEnum.BACKSTAGE, 0, 1)]);
      gildedRose4.updateQuality();
      gildedRose4.updateQuality();
      expect(gildedRose4.items[0].quality).toBe(0);

      const gildedRose5 = new GildedRose([new Item(ItemsEnum.CONJURY, 0, 1)]);
      gildedRose5.updateQuality();
      gildedRose5.updateQuality();
      expect(gildedRose5.items[0].quality).toBe(0);

      const gildedRose6 = new GildedRose([new Item(ItemsEnum.SULFURAS, 0, 80)]);
      gildedRose6.updateQuality();
      gildedRose6.updateQuality();
      expect(gildedRose6.items[0].quality).toBe(80);
    });
  });

  describe("for ordinary object", () => {
    it("should lower quality by one", () => {
      const gildedRose1 = new GildedRose([
        new Item(ItemsEnum.ORDINARY, 10, 30),
      ]);
      gildedRose1.updateQuality();
      expect(gildedRose1.items[0].quality).toBe(29);
    });
  });
});
